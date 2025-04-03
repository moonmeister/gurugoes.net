import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../links";

import { Label, Input, Description, Textarea, Submit, Error } from "./inputs";
import { useAuth } from "../../hooks/use-auth";
import { useMutation, gql } from "urql";

export default function SubmitComment({ data: { postId } }) {
	const { user, signout, signin } = useAuth();

	const [submitCommentResult, submitComment] = useMutation(gql`
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
	`);

	const isLoading = false; //isLoading;

	const methods = useForm({
		defaultValues: { comment: "" },
	});

	const {
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors, isSubmitSuccessful },
	} = methods;

	const onSubmit = async (formData) => {
		if (formData.rememberMe) {
			signin({ name: formData.name, email: formData.email });

			delete formData.rememberMe;
		}

		const mutationData = { ...formData, commentOn: postId };

		try {
			await submitComment(mutationData);
		} catch (err) {
			err.response.errors.forEach((error) => {
				setError("graphql", error);
			});
		}
	};

	useEffect(() => {
		if (errors?.graphql) {
			const timeout = setTimeout(() => clearErrors("graphql"), 5000);

			return () => clearTimeout(timeout);
		}
	}, [errors?.graphql, clearErrors]);

	function SubmittedMessage() {
		return (
			<div className="flex ">
				<p>
					You submitted successfully, your comment may not appear till a
					moderator approves it!
				</p>
				<div className="mx-auto">
					<Button
						onClick={() => {
							reset({
								defaultValues: { comment: "" },
							});
						}}
					>
						Comment Again!
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="py-8">
			<FormProvider {...methods}>
				{isSubmitSuccessful ? (
					<SubmittedMessage />
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={user ? "hidden" : ""}>
							<Label value="Name" htmlFor="name">
								<Input
									id="name"
									type={user ? "hidden" : "text"}
									name="name"
									defaultValue={user.name ?? ""}
									reg={{ required: "A name is required." }}
									placeholder="Billie Jean"
									aria-describedby="name-description"
								/>
								<Description id="name-description">
									Real or fake, made available with your comment.
								</Description>
								<Error
									errors={errors}
									name="name"
									className="text-red-700 italic"
								/>
							</Label>

							<Label value="Email" htmlFor="email">
								<Input
									defaultValue={user.email ?? ""}
									reg={{ required: "An email is required." }}
									type={user ? "hidden" : "email"}
									name="email"
									id="email"
									placeholder="heistheone@jmail.com"
									aria-describedby="email-description"
								/>
								<Description id="email-description">
									We'll only use this for spam prevention.
								</Description>
								<Error
									errors={errors}
									name="email"
									className="text-red-700 italic"
								/>
							</Label>
						</div>

						{!user ? (
							<Label value="Remember me" htmlFor="rememberMe">
								<Input id="rememberMe" name="rememberMe" type="checkbox" />
							</Label>
						) : null}
						<Label
							htmlFor="comment"
							value={
								!user ? (
									"Comment"
								) : (
									<>
										{`Comment as ${user?.name}<${user?.email}>`}&nbsp;
										<button
											className="text-sm underline"
											onClick={() => signout()}
										>
											Logout
										</button>
									</>
								)
							}
						>
							<Textarea
								name="comment"
								className="w-full max-w-full"
								reg={{ required: "A comment is required." }}
							/>
							<Error
								errors={errors}
								name="comment"
								className="text-red-700 italic"
							/>
						</Label>

						<div className="mt-2">
							<Submit value={isLoading ? "Submitting..." : "Comment"} />
						</div>
						<Error errors={errors} name="graphql" />
					</form>
				)}
			</FormProvider>
		</div>
	);
}
