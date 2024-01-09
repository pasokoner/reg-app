<script lang="ts">
	import { cn } from "$lib/utils.js";
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
		<div
			class={cn(
				"space-y-4 p-4",
				data.registrant.position === "left" ? "bg-blue-100" : "bg-red-100"
			)}
		>
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
					{#if data.registrant.childName}
						<span class="font-bold">Child Name:</span>
						{data.registrant.childName}
					{/if}
				</div>
			</div>
		</div>

		<div class="space-y-2 rounded-sm bg-gray-200 p-4">
			<h2 class="font-bold">
				MGA PAALALA SA MISMONG ARAW NG GABI NG MUSIKA, TAGUMPAY, AT SELEBRASYON
			</h2>
			<p>* Magdala ng Valid ID</p>
			<p>* Siguruhing may kopya ng QR CODE (Screenshot o Printed)</p>
			<p>
				* Magtungo sa assigned area (left/right) upang maiwasan ang pagkalito sa pagscan ng QR Code.
			</p>
			<p>
				* Ang lahat ng registered audience ay maaaring pumasok hanggang 8:00 PM lamang. Ito ay upang
				mabigyan ng pagkakataon ang mga hindi registered na makapasok hangga't hindi naaabot ang
				maximum capacity ng lugar na pag gaganapan.
			</p>
			<p>
				- Registered man o non-registered, dapat ay may kasamang magulang ang mga batang may edad 13
				pababa.
			</p>

			<p>- Hinihikayat ang lahat na magsuot ng face mask upang maseguro ang inyong kaligtasan.</p>
			<img src="/stage-layout.jpg" alt="Stage Layout" class="mb-2 rounded-md" />
		</div>
	</main>
{/if}
