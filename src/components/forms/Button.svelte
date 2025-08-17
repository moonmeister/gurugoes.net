<script>
	let {
		type = "button",
		disabled = false,
		class: className = "",
		children,
		...restProps
	} = $props();
</script>

<button {type} {disabled} class={["button", className]} {...restProps}>
	{@render children()}
</button>
