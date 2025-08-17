<script>
	let {
		id = "",
		name = "",
		value = $bindable(""),
		placeholder = "",
		class: className = "",
		required = false,
		rows = 4,
		...restProps
	} = $props();
</script>

<textarea
	{id}
	{name}
	bind:value
	{placeholder}
	{required}
	{rows}
	class={["form-input", className, "form-textarea"]}
	{...restProps}
></textarea>
