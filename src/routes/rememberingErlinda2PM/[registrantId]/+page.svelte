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

<div class="bg-[url('/remembering-erlinda.webp')] bg-contain bg-fixed bg-center">
	<main class="container flex min-h-screen w-full flex-col justify-center py-16">
		<div class="w-full space-y-2">
			<div
				bind:this={qrRef}
				class="mx-auto max-w-2xl space-y-1 rounded-md bg-neutral-300/90 px-4 py-4 sm:px-6"
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
			<div class="mx-auto max-w-2xl space-y-2 rounded-md bg-neutral-300/90 px-4 py-4 sm:px-6">
				<h3 class="text-xl font-bold">Event Reminders</h3>
				<p class="text-xs">
					Maraming salamat sa inyong pagregister upang mapanuod ang Remembering Erlinda bilang
					bahagi ng paggunita sa 82nd Araw ng Kagitingan.
				</p>
				<p class="text-xs">Magkita-kita po tayo sa Abril 5, 2:00 PM.</p>
				<p class="text-xs">Mayroon lamang pong ilang mga paalala sa panunuod:</p>
				<p class="text-xs">
					1. Mahigpit pong ipinakikiusap na i-turn off o ilagay sa silent mode ang ating mga
					cellphones habang may nagtatanghal.
				</p>
				<p class="text-xs">
					2. Maaring tumawa o pumalakpak sa mga bahaging nakakatuwa ngunit hindi pinapahintulutan
					ang paglikha ng ano mang ingay o galaw na maaring makasagabal sa mga nagtatanghal.
				</p>
				<p class="text-xs">
					3. Mahigpit din pong ipinagbabawal ang pagkuha ng anumang video o larawan ng walang
					pahintulot mula sa produksyon o sa Provincial Tourism Office.
				</p>
				<p class="text-xs">
					4.Hindi rin po pinahihintulan ang pagkain at pag-inom sa loob ng tanghalan.
				</p>
			</div>
		</div>
	</main>
</div>
