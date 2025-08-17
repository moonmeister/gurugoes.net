<script>
	let {
		id = "",
		type = "text",
		name = "",
		value = $bindable(""),
		placeholder = "",
		class: className = "",
		required = false,
		checked = $bindable(false),
		...restProps
	} = $props();

	const inputClass = $derived(() => [
		"form-input",
		className,
		type === "checkbox" ? "form-checkbox" : "form-input",
	]);
</script>

{#if type === "checkbox"}
	<input
		{id}
		type="checkbox"
		{name}
		bind:checked
		class={inputClass}
		{...restProps}
	/>
{:else if type === "hidden"}
	<input {id} type="hidden" {name} {value} {...restProps} />
{:else if type === "email"}
	<input
		{id}
		type="email"
		{name}
		bind:value
		{placeholder}
		{required}
		class={inputClass}
		{...restProps}
	/>
{:else}
	<input
		{id}
		type="text"
		{name}
		bind:value
		{placeholder}
		{required}
		class={inputClass}
		{...restProps}
	/>
{/if}
