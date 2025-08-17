<script>
	let { id = "", children, ...restProps } = $props();
</script>

<p {id} class="text-sm font-light text-black" {...restProps}>
	{@render children()}
</p>
