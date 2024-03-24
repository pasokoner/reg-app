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
	<main class="container flex min-h-screen w-full flex-col justify-center py-8">
		<div class="w-full space-y-2">
			<div
				bind:this={qrRef}
				class="mx-auto max-w-2xl space-y-1 rounded-md bg-neutral-300/90 px-4 py-4 text-justify sm:px-6"
			>
				<h1 class="text-2xl">
					Ikaw-82 taong paggunita sa Araw ng Kagitingan Cultural Night: Remebering Erlinda
				</h1>
				<p class="text-neutral-600">
					Inihahandog ng Provincial Tourism Office at Bataan Peninsula Tourism Council Foundation,
					Inc. sa direksyon ni G. Carlos "Bong" Ramos at panulat ni G. Dingdong Novenario kasama ang
					Tanghalang Tatsulok at BNHS Artist sa pakikipagtulungan ng On Stage Events.
				</p>

				<p class="text-neutral-600">
					<span class="font-bold">Kailan:</span>
					{rememberingErlinda2PM.date}
				</p>

				<p class="text-neutral-600">
					<span class="font-bold">Saan:</span>
					{rememberingErlinda2PM.address}
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
			<div
				class="mx-auto max-w-2xl space-y-2 rounded-md bg-neutral-300/90 px-4 py-4 text-justify sm:px-6"
			>
				<h3 class="text-2xl font-bold">MGA PAALALA</h3>
				<p>
					Maraming salamat sa inyong pagregister upang mapanuod ang Remembering Erlinda bilang
					bahagi ng paggunita sa 82nd Araw ng Kagitingan.
				</p>
				<p>Mayroon lamang pong ilang mga paalala sa panunuod:</p>
				<p>
					1. Mahigpit pong ipinakikiusap na i-turn off o ilagay sa silent mode ang ating mga
					cellphones habang may nagtatanghal.
				</p>
				<p>
					2. Maaring tumawa o pumalakpak sa mga bahaging nakakatuwa ngunit hindi pinapahintulutan
					ang paglikha ng ano mang ingay o galaw na maaring makasagabal sa mga nagtatanghal.
				</p>
				<p>
					3. Mahigpit din pong ipinagbabawal ang pagkuha ng anumang video o larawan ng walang
					pahintulot mula sa produksyon o sa Provincial Tourism Office.
				</p>
				<p>4. Hindi rin po pinahihintulan ang pagkain at pag-inom sa loob ng tanghalan.</p>
				<p>
					5. Sa pagpasok sa tanghalan dalin lamang ang inyong QR code. Maaari itong picture na nasa
					inyong mga cellphone o printed.
				</p>
				<p>
					6. Maaaring makipagugnayan sa ating mga usher kung may katanungan o kailangan sa loob ng
					ating tanghalan.
				</p>

				<h3 class="text-center text-3xl">
					Magkita-kita po tayo sa Abril 5, 2024 2:00 PM at huwag kalimutan ipakita ang QR Code na
					ito.
				</h3>
			</div>
		</div>
	</main>
</div>
