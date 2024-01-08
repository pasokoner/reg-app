<script lang="ts">
	import { MAX_REGISTRANTS } from "$lib/shared/config";
	import { onDestroy, onMount } from "svelte";
	import type { PageData } from "./$types";
	import RegForm from "./reg-form.svelte";

	export let data: PageData;

	$: total = data.leftTotal + data.rightTotal;
	$: slot = MAX_REGISTRANTS - total < 1 ? 0 : MAX_REGISTRANTS - total;

	onMount(() => {
		async function getTotal() {
			const response = await fetch("/api/total");
			const responseData: { leftTotal: number; rightTotal: number } = await response.json();

			data.leftTotal = responseData.leftTotal;
			data.rightTotal = responseData.rightTotal;
		}

		const interval = setInterval(getTotal, 5000);

		getTotal();

		return () => clearInterval(interval);
	});
</script>

<main class="container min-h-screen max-w-screen-md space-y-4 pb-16 pt-8">
	<img
		src="/image-header.png"
		class="w-full rounded-md"
		alt="Gabi ng Musia tagumpay at selebrasyon"
	/>
	<div>
		<h1 class="text-2xl font-bold">Online Registration</h1>
		<h3>Available Slot: {slot}</h3>
	</div>
	<RegForm form={data.form} leftTotal={data.leftTotal} rightTotal={data.rightTotal} />
</main>
