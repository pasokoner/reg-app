<script lang="ts">
	import RegForm from "./reg-form.svelte";
	import { rememberingErlinda2PM } from "$lib/config.js";
	import { onMount } from "svelte";

	export let data;

	$: closed = data.registrantCount >= 1000;

	onMount(() => {
		async function getTotal() {
			const response = await fetch("/api/rememberingErlinda2PM");
			const result: { total: number }[] = await response.json();

			data.registrantCount = result[0].total;
		}

		const interval = setInterval(getTotal, 30000);

		getTotal();

		return () => clearInterval(interval);
	});
</script>

{#if data.registrantCount >= rememberingErlinda2PM.limit}
	<div>SORRY THE REGISTRATION IS CLOSED</div>
{:else}
	<div class="bg-centerbg-center bg-[url('/remembering-erlinda.webp')] bg-contain bg-fixed">
		<main class="container flex min-h-screen w-full flex-col justify-center py-16">
			<div class="w-full">
				<div class="mx-auto max-w-2xl space-y-1 rounded-t-md bg-neutral-300 px-4 py-4 sm:px-6">
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
					<p class="text-xs text-neutral-600 sm:text-sm">
						<span class="font-bold">Registration Limit:</span>
						<span class="rounded-lg bg-white px-2 py-1">
							{data.registrantCount} / {rememberingErlinda2PM.limit}
						</span>
						{#if closed}
							<span class="rounded-lg bg-red-500 px-2 py-1 text-white">CLOSED</span>
						{:else}
							<span class="rounded-lg bg-green-500 px-2 py-1 text-white">OPEN</span>
						{/if}
					</p>
					<p class="text-xs text-neutral-600 sm:text-sm">
						This website refreshes every 30 seconds. Refresh for the latest count.
					</p>
				</div>
				<div class="mx-auto max-w-2xl rounded-b-md bg-white/90 px-4 py-4 sm:px-6">
					<RegForm data={data.form} {closed} />
				</div>
			</div>
		</main>
	</div>
{/if}
