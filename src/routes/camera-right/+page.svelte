<script lang="ts">
	import { onMount } from "svelte";

	import QrScanner from "qr-scanner";

	import { Loader2 } from "lucide-svelte";
	import type { Registrant } from "$lib/shared/types";
	import { format } from "date-fns";

	let scannedResult: string;

	onMount(init);

	function init() {
		const scanner = new QrScanner(
			document.getElementById("video-feed") as HTMLVideoElement,
			(result: { data: string }) => {
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
	}

	async function findRegistrant(id: string): Promise<Registrant> {
		const response = await fetch(`/api/camera-right/${id}`);

		const reg: { registrant: Registrant; message?: string } = await response.json();

		if (reg.message) {
			throw new Error(reg.message);
		}

		return reg.registrant;
	}

	$: console.log(scannedResult);
</script>

<main class="container h-screen max-w-screen-md p-0">
	<div class="relative flex h-full w-full justify-center">
		<video id="video-feed" />

		<div class="absolute top-0 w-full">
			<h1 class="w-full bg-gray-200 py-4 text-center text-xl font-bold">RIGHT AREA SCANNER</h1>

			{#if scannedResult}
				{#await findRegistrant(scannedResult)}
					<div
						class="flex w-full items-center justify-center gap-2 rounded-md bg-gray-200/80 p-2 text-lg font-semibold"
					>
						Please wait while scanning! <Loader2 class="h-4 w-4 animate-spin" />
					</div>
				{:then value}
					<div class="space-y-2 rounded-md bg-green-300/80 p-2">
						<h3 class="w-full text-center">QR Code verified successfully</h3>
						<div class="grid w-full grid-cols-2 text-sm">
							<div><span class="font-bold">Name:</span> {value.name}</div>
							<div>
								<span class="font-bold">Birthdate:</span>
								{format(value.dob, "MM/dd/yyyy")}
							</div>
							<div><span class="font-bold">Area:</span> {value.position}</div>
							{#if value.childName}
								<div class="col-span-2">
									<span class="font-bold">Child Name:</span>
									{value.childName}
								</div>
							{/if}
						</div>
					</div>
				{:catch error}
					<div
						class="z-[999] flex w-full items-center justify-center gap-2 rounded-md bg-red-200/80 p-2 text-lg font-semibold"
					>
						{error.message}
					</div>
				{/await}
			{/if}
		</div>
	</div>
</main>

<style>
	#video-feed {
		height: 100%;
		width: 100%;
	}
</style>
