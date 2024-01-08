<script lang="ts">
	import { format } from "date-fns";
	import { QRCodeImage } from "svelte-qrcode-image";

	export let data;
</script>

{#if !data.registrant}
	<h1 class="text-3xl font-bold">Participant does not exist</h1>
{:else}
	<main class="container min-h-screen max-w-screen-md space-y-2 pb-16 pt-8">
		<img
			src="/image-header.png"
			class="w-full rounded-md"
			alt="Gabi ng Musia tagumpay at selebrasyon"
		/>
		<h1 class="text-2xl font-bold">Congratulations on your registration!</h1>
		<div class="space-y-4 bg-sky-100 p-4">
			<div class="flex flex-col gap-4 rounded-sm sm:flex-row">
				<div class="mb-2 flex justify-center">
					<div class="overflow-hidden rounded-md">
						<QRCodeImage text={data.registrant.id} width={160} />
					</div>
				</div>
				<div>
					<p><span class="font-bold">Name:</span> {data.registrant.name}</p>
					<p><span class="font-bold">Contact Number:</span> {data.registrant.contactNumber}</p>
					<p>
						<span class="font-bold">Birthdate:</span>
						{format(data.registrant.dob, "MM/dd/yyyy")}
					</p>
					<p>
						<span class="font-bold">In case of Emergecy Contact:</span>
						{data.registrant.emergencyContactName}
					</p>
					<p>
						<span class="font-bold">In case of Emergency Contact No.:</span>
						{data.registrant.emergencyContactNumber}
					</p>
					<p><span class="font-bold">Position:</span> {data.registrant.position}</p>
				</div>
			</div>
		</div>

		<div class="space-y-2 rounded-sm bg-gray-200 p-4">
			<h2 class="font-bold">REMINDER</h2>
			<p>
				- Use the QR code for your attendance, and you can either save the QR code or bookmark the
				provided link.
			</p>
			<p>- The QR code can only be used once.</p>
			<p>
				- Ensure that you are aged 13 and above (Please bring your ID for verification purposes)
			</p>
			<p>- Please follow the designated position indicated for you.</p>
			<p class="text-sm">Refer to the image below for guidance:</p>
			<img src="/stage-layout.jpg" alt="Stage Layout" class="mb-2 rounded-md" />
		</div>
	</main>
{/if}
