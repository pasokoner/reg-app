<script lang="ts">
	import { onMount } from "svelte";
	import QrCode from "$lib/components/qr-code.svelte";
	import html2canvas from "html2canvas";
	import { page } from "$app/stores";
	import { rememberingErlinda2PM } from "$lib/config";

	export let data;
	let qrRef: HTMLDivElement;

	onMount(() => {
		html2canvas(qrRef).then((canvas) => {
			const link = document.createElement("a");
			link.download = `Remembering_Erlinda_2PM_QR_TICKET.png`;
			link.href = canvas.toDataURL();
			link.click();
		});
	});
</script>

<div class="bg-[(/remembering-erlinda.webp)] bg-contain bg-fixed bg-center">
	<main class="container flex min-h-screen w-full flex-col justify-center py-16">
		<div class="w-full">
			<div
				bind:this={qrRef}
				class="mx-auto max-w-2xl space-y-1 rounded-t-md bg-neutral-300/90 px-4 py-4 sm:px-6"
			>
				<h1 class="text-2xl">Remembering Erlinda</h1>
				<p class="text-xs text-neutral-600 sm:text-sm">
					A Musical Production by BATAAN TOURISM COUNCIL FOUNDATION INC. In partnership with
					Tanghalang Tatsulok, BNHS, & On Stage Events
				</p>
				<p class="text-xs text-neutral-600 sm:text-sm">
					<span class="font-bold">Where:</span>
					{rememberingErlinda2PM.address}
				</p>
				<p class="text-xs text-neutral-600 sm:text-sm">
					<span class="font-bold">When:</span>
					{rememberingErlinda2PM.date}
				</p>

				<div class="flex flex-col gap-2 sm:flex-row">
					<div class="grid flex-1 grid-cols-8 py-4 sm:py-10">
						<div class="col-span-2 text-xs font-bold sm:text-sm">Name:</div>
						<div class="col-span-6 text-xs sm:text-sm">{data.registrant?.fullName}</div>
						<div class="col-span-2 text-xs font-bold sm:text-sm">Contact No.:</div>
						<div class="col-span-6 text-xs sm:text-sm">{data.registrant?.contactNumber}</div>
						<div class="col-span-2 text-xs font-bold sm:text-sm">Email:</div>
						<div class="col-span-6 text-xs sm:text-sm">{data.registrant?.email}</div>
					</div>
					<div class="flex items-center justify-center">
						<QrCode
							value={$page.params.registrantId}
							options={{
								width: 120,
								margin: 0.5
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
