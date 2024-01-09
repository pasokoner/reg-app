<script lang="ts">
	import { onMount } from "svelte";

	import QrScanner from "qr-scanner";

	import { Button } from "$lib/components/ui/button";
	import { Eye, Loader2 } from "lucide-svelte";
	import type { Registrant } from "$lib/shared/types";
	import { message } from "sveltekit-superforms/server";

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
		const response = await fetch(`/api/camera-left/${id}`);

		const reg: { registrant: Registrant; message?: string } = await response.json();

		if (reg.message) {
			throw new Error(reg.message);
		}

		return reg.registrant;
	}

	$: console.log(scannedResult);
</script>

<main class="container h-screen p-0">
	<h1 class="bg-gray-200 py-4 text-center text-xl font-bold">LEFT AREA SCANNER</h1>
	<div class="relative flex h-full w-full justify-center">
		<video id="video-feed" />

		{#if scannedResult}
			{#await findRegistrant(scannedResult)}
				<div class="absolute flex w-full max-w-[700px] justify-center">
					<div
						class="flex w-full items-center justify-center gap-2 rounded-md bg-gray-200/70 p-2 text-lg font-semibold"
					>
						Please wait while scanning! <Loader2 class="h-4 w-4 animate-spin" />
					</div>
				</div>
			{:then value}
				<div class="absolute bottom-10 flex w-full max-w-[700px] justify-center">
					<div class="flex w-full gap-2 rounded-md bg-white/70 p-2">
						<div class="flex-1">
							Serial: {value.name}
						</div>
					</div>
				</div>
			{:catch error}
				<div class="absolute flex w-full max-w-[700px] justify-center">
					<div
						class="flex w-full items-center justify-center gap-2 rounded-md bg-red-200/70 p-2 text-lg font-semibold"
					>
						{error.message}
					</div>
				</div>
			{/await}
		{/if}
	</div>
</main>

<style>
	#video-feed {
		height: 100%;
		width: 100%;
	}
</style>
