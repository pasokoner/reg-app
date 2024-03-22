<script lang="ts">
	import "../app.pcss";
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

	injectSpeedInsights();
</script>

<svelte:head>
	<style>
		@font-face {
			font-family: "Alexandria";
			font-style: normal;
			font-weight: 500;
			src: url("/Alexandria-VariableFont_wght.ttf"); /* IE9 Compat Modes */
		}
	</style>
	<title>PGB Registration System</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		font-family: "Alexandria", sans-serif;
	}
</style>
