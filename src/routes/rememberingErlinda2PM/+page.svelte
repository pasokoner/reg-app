<script lang="ts">
	import RegForm from "./reg-form.svelte";
	import { rememberingErlinda2PM } from "$lib/config.js";
	import { onMount } from "svelte";

	export let data;

	let registrantCount = data.registrantCount;
	$: closed = data.registrantCount >= rememberingErlinda2PM.limit;

	onMount(() => {
		async function getTotal() {
			const response = await fetch("/api/rememberingErlinda2PM");
			const result: number = await response.json();

			registrantCount = result;
		}

		const interval = setInterval(getTotal, 30000);

		getTotal();

		return () => clearInterval(interval);
	});
</script>

<div class="bg-centerbg-center bg-[url('/remembering-erlinda.webp')] bg-contain bg-fixed">
	<main class="container flex min-h-screen w-full flex-col justify-center py-16">
		<div class="w-full">
			<div
				class="mx-auto max-w-2xl space-y-1 rounded-t-md bg-neutral-300 px-4 py-4 text-justify sm:px-6"
			>
				<h1 class="text-2xl">
					Ika-82 taong paggunita sa Araw ng Kagitingan Cultural Night: Remembering Erlinda
				</h1>
				<p class="text-neutral-600">
					Inihahandog ng Provincial Tourism Office at Bataan Peninsula Tourism Council Foundation,
					Inc. sa direksyon ni G. Carlos "Bong" Ramos at panulat ni G. Dingdong Novenario kasama ang
					Tanghalang Tatsulok at BNHS Artist sa pakikipagtulungan ng On Stage Events.
				</p>
				<p class="text-neutral-600">
					<span class="font-bold">Where:</span>
					{rememberingErlinda2PM.address}
				</p>
				<p class="text-neutral-600">
					<span class="font-bold">When:</span>
					{rememberingErlinda2PM.date}
				</p>
				<p class="text-neutral-600">
					<span class="font-bold">Registration Limit:</span>
					<span class="rounded-lg bg-white px-2 py-1">
						{registrantCount} / {rememberingErlinda2PM.limit}
					</span>
					{#if closed}
						<span class="rounded-lg bg-red-500 px-2 py-1 text-white">CLOSED</span>
					{:else}
						<span class="rounded-lg bg-green-500 px-2 py-1 text-white">OPEN</span>
					{/if}
				</p>
				<p class="text-neutral-600">
					This website refreshes every 30 seconds. Refresh for the latest count.
				</p>
			</div>
			<div class="mx-auto max-w-2xl rounded-b-md bg-white/90 px-4 py-4 sm:px-6">
				<RegForm data={data.form} {closed} />
			</div>
		</div>
	</main>
</div>
