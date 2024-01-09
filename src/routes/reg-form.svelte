<script lang="ts">
	import * as Form from "$lib/components/ui/form";
	import { Label } from "$lib/components/ui/label";
	import { MAX_LEFT_SIDE, MAX_RIGHT_SIDE } from "$lib/shared/config";
	import { regFormSchema, type RegFormSchema } from "$lib/shared/form-schema";
	import { AlertTriangle } from "lucide-svelte";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<RegFormSchema, string>;
	export let leftTotal: number;
	export let rightTotal: number;
</script>

<Form.Root method="POST" {form} schema={regFormSchema} let:submitting let:message let:config>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Full Name</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="dob">
		<Form.Item>
			<Form.Label>Date of Birth</Form.Label>
			<Form.Input type="date" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="contactNumber">
		<Form.Item>
			<Form.Label>Contact Number</Form.Label>
			<Form.Input placeholder="Example: 09123456789" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="emergencyContactName">
		<Form.Item>
			<Form.Label>In case of emergency contact</Form.Label>
			<Form.Input placeholder="Name of individual to contact" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="emergencyContactNumber">
		<Form.Item>
			<Form.Label>In case of emergency contact number</Form.Label>
			<Form.Input placeholder="Contact No. of individual to contact" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="address">
		<Form.Item>
			<Form.Label>Address</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="position">
		<Form.Item>
			<Form.Label>Area</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Select area" />
				<Form.SelectContent>
					<Form.SelectItem
						disabled={leftTotal >= MAX_LEFT_SIDE}
						value="left"
						class="flex justify-between"
					>
						<div>LEFT</div>
						<div>Slot: {MAX_LEFT_SIDE - leftTotal < 1 ? 0 : MAX_LEFT_SIDE - leftTotal}</div>
					</Form.SelectItem>
					<Form.SelectItem
						disabled={rightTotal >= MAX_RIGHT_SIDE}
						value="right"
						class="flex justify-between"
						><div>RIGHT</div>
						<div>
							Slot: {MAX_RIGHT_SIDE - rightTotal < 1 ? 0 : MAX_RIGHT_SIDE - rightTotal}
						</div></Form.SelectItem
					>
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>See picture below to select your area</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<img src="/stage-layout.jpg" alt="Stage Layout" class="mb-2 rounded-md" />

	{#if message}
		<div
			class="mb-2 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive"
		>
			<AlertTriangle className="h-4 w-4" />
			<p>{message}</p>
		</div>
	{/if}

	<div class="flex">
		<Form.Button disabled={submitting} class="ml-auto w-full bg-[#174A9D] sm:w-auto"
			>Finish Registration</Form.Button
		>
	</div>
</Form.Root>
