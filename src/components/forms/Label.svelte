<script>
	let { htmlFor = "", value = "", children, valueSnippet } = $props();
</script>

<div class="py-2">
	<label for={htmlFor} class="block text-sm font-semibold">
		{#if valueSnippet}
			{@render valueSnippet()}
		{:else}
			{value}
		{/if}
		<div class="mt-1">
			{@render children?.()}
		</div>
	</label>
</div>
