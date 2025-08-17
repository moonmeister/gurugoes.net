<script>
	let { value = "Submit", disabled = false, ...restProps } = $props();
</script>

<input
	type="submit"
	{value}
	{disabled}
	class={[
		"button",
		"cursor-pointer",
		{ "cursor-not-allowed opacity-50": disabled },
	]}
	{...restProps}
/>
