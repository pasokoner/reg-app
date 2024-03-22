<script lang="ts">
	import { cameraSchema, type CameraSchema } from "$lib/zod-schemas";

	import { onMount, tick } from "svelte";
	import QrScanner from "qr-scanner";
	import { LoaderIcon } from "lucide-svelte";

	import * as Form from "$lib/components/ui/form";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import Input from "$lib/components/ui/input/input.svelte";

	export let data: SuperValidated<Infer<CameraSchema>>;

	let scannedResult: string;
	let videoFeed: HTMLVideoElement;
	let submitBtn: HTMLButtonElement;
	let successMessage = "";

	const form = superForm(data, {
		dataType: "json",
		validators: zodClient(cameraSchema),
		onUpdate(event) {
			if (event.form.valid) {
				successMessage = "Scanned successfully!";
				return;
			}
			successMessage = "";
		}
	});

	const { form: formData, enhance, errors, submitting } = form;

	onMount(() => {
		const scanner = new QrScanner(
			videoFeed,
			async (result: { data: string }) => {
				scannedResult = result.data;
			},
			{
				/* your options or returnDetailedScanResult: true if you're not specifying any other options */
				highlightScanRegion: true
				// overlay: scannerOverlay
			}
		);

		scanner.start();

		return () => {
			scanner.destroy();
		};
	});

	$: {
		if (scannedResult) {
			submitForm(scannedResult);
		}
	}

	async function submitForm(result: string) {
		$formData.registrantId = result;
		await tick();
		submitBtn.click();
	}
</script>

<main class="flex h-screen max-h-screen w-full flex-col">
	<div
		class="absolute top-0 flex h-16 w-full items-center justify-center bg-black text-sm font-semibold text-white sm:text-xl"
	>
		REMEMBERING ERLINDA 6PM SCANNER
	</div>

	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoFeed} class="flex-1" />

	<form method="POST" use:enhance class="absolute bottom-0 w-full">
		<Form.Field {form} name="registrantId" class="hidden">
			<Form.Control let:attrs>
				<Form.Label>Full Name</Form.Label>
				<Input {...attrs} bind:value={$formData.registrantId} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Errors errors={$errors._errors} />

		{#if $submitting}
			<div class="flex h-16 items-center justify-center gap-x-2 bg-orange-700 text-xl">
				<LoaderIcon class="animate-spin" /> Please wait...
			</div>
		{:else if successMessage}
			<div class="flex h-16 items-center justify-center bg-green-700 text-xl">
				{successMessage}
			</div>
		{:else if $errors._errors && $errors._errors.length > 0}
			{#each $errors._errors as err}
				<div class="bg-green-dark flex h-16 items-center justify-center bg-red-800 text-xl">
					{err}
				</div>
			{/each}
		{:else}
			<div class="flex h-16 w-full items-center justify-center bg-black text-xl text-white">
				STANDBY
			</div>
		{/if}

		<button type="submit" bind:this={submitBtn} class="hidden" />
	</form>
</main>
