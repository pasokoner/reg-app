<script lang="ts">
	import EmailVerificationForm from "./email-verification-form.svelte";
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import { differenceInSeconds, format } from "date-fns";
	import { onMount } from "svelte";
	import { Loader } from "lucide-svelte";

	export let data;

	let timerId: NodeJS.Timeout;
	let difference: number = differenceInSeconds(data.expires_at, new Date());
	let resending = false;

	// 5 MINUTES
	$: disableResend = difference > 0 && difference <= 300;
	$: minutes = Math.floor(difference / 60);
	$: seconds = difference % 60;
	$: formattedResult = format(new Date(0, 0, 0, 0, minutes, seconds), "mm:ss");

	onMount(() => {
		timerId = setInterval(function () {
			difference = differenceInSeconds(data.expires_at, new Date());
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

<main class="container min-h-screen max-w-2xl py-12">
	<div class="mb-4 space-y-2 rounded-md bg-white px-6 py-8 sm:px-8">
		<!-- <h2 class="text-2xl font-bold">Welcome to My Website</h2>
		<p class="text-gray-600">Login your account</p> -->
		<div class="flex flex-col items-center justify-center gap-y-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width=".25"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-send h-32 w-32 text-sky-400 sm:h-40 sm:w-40"
				><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg
			>

			<div class="text-center">
				<h2 class="text-xl font-semibold">An email has been sent to you.</h2>
				<p class="text-center text-sm text-gray-500">
					Check the email that's associated with your account for the verification code
				</p>
				<span class="text-center text-sm text-gray-500">{data.email}</span>
			</div>

			<div class="w-full space-y-2 border-y py-4">
				<EmailVerificationForm data={data.form} />

				<form
					method="post"
					action="?/resend"
					use:enhance={({}) => {
						resending = true;

						return async ({ update }) => {
							resending = false;
							update();
						};
					}}
					class="flex justify-center"
				>
					<Button
						variant="link"
						type="submit"
						class="flex items-center text-sm"
						disabled={disableResend || resending}
						>Send me another code
						{#if disableResend}
							({formattedResult})
						{/if}
						{#if resending}
							<Loader class="ml-1 h-4 w-4 animate-spin" />
						{/if}
					</Button>
				</form>
			</div>
		</div>
	</div>
</main>
