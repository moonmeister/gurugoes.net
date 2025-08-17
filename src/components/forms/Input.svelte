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
</script>

{#if type === "checkbox"}
	<input
		{id}
		type="checkbox"
		{name}
		bind:checked
		class={["form-inputs", "checked:bg-green-800", className]}
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
		class={["form-inputs", className]}
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
		class={["form-inputs", className]}
		{...restProps}
	/>
{/if}
