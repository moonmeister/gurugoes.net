<script>
	let { id = "", children, ...restProps } = $props();
</script>

<p {id} class="text-sm font-light text-gray-700" {...restProps}>
	{@render children()}
</p>
