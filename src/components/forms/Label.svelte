<script>
	let { htmlFor = "", value = "", children, valueSnippet } = $props();
</script>

<div class="p-2">
	<label for={htmlFor} class="block text-sm font-semibold text-black">
		{#if valueSnippet}
			{@render valueSnippet()}
		{:else}
			{value}
		{/if}
		<div class="mt-1">
			{@render children()}
		</div>
	</label>
</div>
