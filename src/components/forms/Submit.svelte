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
		{ "opacity-50 cursor-not-allowed": disabled },
	]}
	{...restProps}
/>
