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
		<h1 class="text-2xl font-bold">Congratulations. You are now registered</h1>
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
					<p><span class="font-bold">Area:</span> {data.registrant.position}</p>
				</div>
			</div>
		</div>

		<div class="space-y-2 rounded-sm bg-gray-200 p-4">
			<h2 class="font-bold">REMINDER</h2>
			<p>
				- You can use the QR Code <span class="font-bold">ONCE</span> for your entrance. Please make
				sure that you save the QR code or bookmark the provided link upon the arrival at the venue.
			</p>
			<p>- Only 13 years old and above can enter. Please bring a valid id for verification</p>
			<p>
				- Proceed to the approved designated area. Please check the map below for your guidance.
			</p>
			<p>- Please follow the designated area indicated for you.</p>
			<img src="/stage-layout.jpg" alt="Stage Layout" class="mb-2 rounded-md" />
		</div>
	</main>
{/if}
