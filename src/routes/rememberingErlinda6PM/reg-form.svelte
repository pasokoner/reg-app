<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { registrationFormSchema, type RegistrationFormSchema } from "./schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<RegistrationFormSchema>>;

	export let closed = false;

	const form = superForm(data, {
		validators: zodClient(registrationFormSchema)
	});

	const { form: formData, enhance, errors } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
	<Form.Field {form} name="fullName">
		<Form.Control let:attrs>
			<Form.Label>Full Name</Form.Label>
			<Input {...attrs} disabled={closed} bind:value={$formData.fullName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="dob">
		<Form.Control let:attrs>
			<Form.Label>Date of Birth</Form.Label>
			<Input {...attrs} disabled={closed} type="date" bind:value={$formData.dob} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="address">
		<Form.Control let:attrs>
			<Form.Label>Address</Form.Label>
			<Input {...attrs} disabled={closed} bind:value={$formData.address} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} disabled={closed} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="contactNumber">
		<Form.Control let:attrs>
			<Form.Label>Contact Number</Form.Label>
			<Input {...attrs} disabled={closed} bind:value={$formData.contactNumber} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Errors errors={$errors._errors} />

	<div class="flex justify-end">
		<Form.Button disabled={closed} class="bg-neutral-300 text-neutral-600 hover:bg-neutral-300/90">
			Register Now!
		</Form.Button>
	</div>
</form>
