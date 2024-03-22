<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Input } from "$lib/components/ui/input";
	import { emailVerificationSchema, type EmailVerficationSchema } from "$lib/zod-schemas";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<EmailVerficationSchema>>;

	const form = superForm(data, {
		validators: zodClient(emailVerificationSchema)
	});

	const { form: formData, enhance, errors, submitting } = form;
</script>

<form method="POST" action="?/verify" use:enhance>
	<Form.Field {form} name="code">
		<Form.Control let:attrs>
			<Form.Label>Verification Code</Form.Label>
			<Input {...attrs} bind:value={$formData.code} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Errors errors={$errors._errors} />

	<Form.Button disabled={$submitting} class="w-full">Verify</Form.Button>
</form>
