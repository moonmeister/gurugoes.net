<script>
	import { mutationStore, gql } from "@urql/svelte";
	import { onMount } from "svelte";
	import Button from "@/components/forms/Button.svelte";
	import Label from "@/components/forms/Label.svelte";
	import Input from "@/components/forms/Input.svelte";
	import Description from "@/components/forms/Description.svelte";
	import Textarea from "@/components/forms/Textarea.svelte";
	import Submit from "@/components/forms/Submit.svelte";
	import { authStore } from "@/stores/auth.svelte";
	import { client } from "@/lib/client";

	let { postId } = $props();

	// Form state using runes
	let formData = $state({
		name: "",
		email: "",
		comment: "",
		rememberMe: false,
	});

	let errors = $state({});
	let isSubmitSuccessful = $state(false);
	let isLoading = $state(false);
	let mutationResult = $state(null);

	// Reactive auth state using runes
	const user = $derived(authStore.user);

	// Initialize form with user data if available using effect
	$effect(() => {
		if (user && user !== false) {
			formData.name = user.name || "";
			formData.email = user.email || "";
		}
	});

	// Function to submit comment using mutationStore
	const submitComment = (variables) => {
		mutationResult = mutationStore({
			client,
			query: gql`
				mutation postComment(
					$name: String!
					$email: String!
					$comment: String!
					$commentOn: Int!
				) {
					createComment(
						input: {
							author: $name
							authorEmail: $email
							content: $comment
							commentOn: $commentOn
						}
					) {
						success
					}
				}
			`,
			variables,
		});
		return mutationResult;
	};

	function validateForm() {
		errors = {};

		if ((!user || user === false) && !formData.name.trim()) {
			errors.name = "A name is required.";
		}

		if ((!user || user === false) && !formData.email.trim()) {
			errors.email = "An email is required.";
		}

		if (!formData.comment.trim()) {
			errors.comment = "A comment is required.";
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!validateForm()) return;

		if (formData.rememberMe) {
			authStore.signin({
				name: formData.name,
				email: formData.email,
			});
		}

		const mutationData = {
			name: formData.name,
			email: formData.email,
			comment: formData.comment,
			commentOn: postId,
		};

		// Execute mutation using mutationStore
		submitComment(mutationData);
	}

	function resetForm() {
		formData = {
			name: user && user !== false ? user.name || "" : "",
			email: user && user !== false ? user.email || "" : "",
			comment: "",
			rememberMe: false,
		};
		errors = {};
		isSubmitSuccessful = false;
	}

	function handleSignout() {
		authStore.signout();
		formData.name = "";
		formData.email = "";
	}

	// Handle mutation result reactively
	$effect(() => {
		if (mutationResult) {
			// mutationResult is a store, so we need to subscribe to it
			const unsubscribe = mutationResult.subscribe((result) => {
				if (result.error) {
					isLoading = false;
					if (result.error.graphQLErrors) {
						result.error.graphQLErrors.forEach((error) => {
							errors.graphql = error.message;
						});
					} else {
						errors.graphql = result.error.message;
					}
				} else if (result.data) {
					isLoading = false;
					isSubmitSuccessful = true;
				} else if (result.fetching) {
					isLoading = true;
				}
			});

			return unsubscribe;
		}
	});

	// Clear GraphQL errors after 5 seconds using effect
	$effect(() => {
		if (errors.graphql) {
			const timeout = setTimeout(() => {
				delete errors.graphql;
				errors = { ...errors };
			}, 5000);

			return () => clearTimeout(timeout);
		}
	});

	// Initialize auth store on mount
	onMount(() => {
		authStore.init();
	});
</script>

<div>
	{#if isSubmitSuccessful}
		<div class="flex">
			<p>
				You submitted successfully, your comment may not appear till a moderator
				approves it!
			</p>
			<div class="mx-auto">
				<Button onclick={resetForm}>Comment Again!</Button>
			</div>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class=" flex flex-wrap gap-4">
			<div class={user ? "hidden" : ""}>
				<Label value="Name" htmlFor="name">
					<Input
						id="name"
						type={user ? "hidden" : "text"}
						name="name"
						bind:value={formData.name}
						placeholder="Billie Jean"
						aria-describedby="name-description"
						required={!user}
						disabled={isLoading}
					/>
					<Description id="name-description">
						Real or fake, made available with your comment.
					</Description>
					{#if errors.name}
						<p class="text-red-700 italic">{errors.name}</p>
					{/if}
				</Label>

				<Label value="Email" htmlFor="email">
					<Input
						id="email"
						type={user ? "hidden" : "email"}
						name="email"
						bind:value={formData.email}
						placeholder="heistheone@jmail.com"
						aria-describedby="email-description"
						required={!user}
						disabled={isLoading}
					/>
					<Description id="email-description">
						We'll only use this for spam prevention.
					</Description>
					{#if errors.email}
						<p class="text-red-700 italic">{errors.email}</p>
					{/if}
				</Label>
			</div>

			<div class="w-80 flex-grow">
				<Label htmlFor="comment">
					{#snippet valueSnippet()}
						{#if !user}
							Comment
						{:else}
							Comment as {user.name}&lt;{user.email}&gt;&nbsp;
							<button
								type="button"
								class="cursor-pointer text-sm underline"
								onclick={handleSignout}
							>
								Forget me
							</button>
						{/if}
					{/snippet}
					<Textarea
						id="comment"
						name="comment"
						bind:value={formData.comment}
						class="w-full max-w-full"
						required={true}
						disabled={isLoading}
					/>
					{#if errors.comment}
						<p class="text-red-700 italic">{errors.comment}</p>
					{/if}
				</Label>

				<div class="flex items-center gap-2 p-2">
					<Submit
						value={isLoading ? "Submitting..." : "Comment"}
						disabled={isLoading}
					/>
					{#if !user || user === false}
						<Label value="Remember me" htmlFor="rememberMe"></Label>
						<Input
							id="rememberMe"
							name="rememberMe"
							type="checkbox"
							bind:checked={formData.rememberMe}
						/>
					{/if}
				</div>
				{#if errors.graphql}
					<p class="text-red-700 italic">{@html errors.graphql}</p>
				{/if}
			</div>
		</form>
	{/if}
</div>
