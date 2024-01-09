import type { PageServerLoad, Actions } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { regFormSchema } from "$lib/shared/form-schema";
import { fail, redirect } from "@sveltejs/kit";
import postgres from "postgres";
import { db } from "$lib/server/db";
import { registrant } from "$lib/server/db/schema";
import { MAX_LEFT_SIDE, MAX_RIGHT_SIDE } from "$lib/shared/config";

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch("/api/total");
	const total: { leftTotal: number; rightTotal: number } = await response.json();

	return {
		form: await superValidate(regFormSchema),
		leftTotal: total.leftTotal,
		rightTotal: total.rightTotal
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, regFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let registrantId: string;
		const response = await event.fetch("/api/total");
		const { leftTotal, rightTotal }: { leftTotal: number; rightTotal: number } =
			await response.json();

		if (form.data.position === "left" && leftTotal >= MAX_LEFT_SIDE) {
			return message(form, "Oh! Please select another position");
		}

		if (form.data.position === "right" && rightTotal >= MAX_RIGHT_SIDE) {
			return message(form, "Oh! Please select another position");
		}

		try {
			const id = await db
				.insert(registrant)
				.values({
					...form.data,
					dob: new Date(form.data.dob).toISOString(),
					childName: form.data.childName ? form.data.childName : undefined
				})
				.returning({
					id: registrant.id
				});

			registrantId = id[0].id;
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				if (e.constraint_name === "registrant_contact_number_unique") {
					return message(form, "Contact no. already exist", {
						status: 400
					});
				}
			}
			console.log(e);

			return message(form, "An unknown error occured", {
				status: 500
			});
		}

		redirect(303, `/${registrantId}`);
	}
};
