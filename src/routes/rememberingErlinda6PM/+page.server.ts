import type { PageServerLoad, Actions } from "./$types.js";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { registrationFormSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.js";
import { rememberingErlinda6PMTable } from "$lib/server/db/schema.js";
import postgres from "postgres";
import { rememberingErlinda6PM } from "$lib/config.js";
import { generateEmailVerificationCode, sendEmail } from "$lib/server/email.js";
import { eq, sql } from "drizzle-orm";

export const load: PageServerLoad = async () => {
	async function getRegistrantsLength() {
		const data = await db
			.select({
				total: sql<number>`cast(count(${rememberingErlinda6PMTable.id}) as int)`
			})
			.from(rememberingErlinda6PMTable)
			.where(eq(rememberingErlinda6PMTable.email_verified, true));

		return data[0].total;
	}

	return {
		form: await superValidate(zod(registrationFormSchema)),
		registrantCount: await getRegistrantsLength()
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registrationFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let registrantId = "";

		try {
			const registrants = await db
				.select({
					total: sql<number>`cast(count(${rememberingErlinda6PMTable.id}) as int)`
				})
				.from(rememberingErlinda6PMTable)
				.where(eq(rememberingErlinda6PMTable.email_verified, true));

			if (registrants[0].total >= rememberingErlinda6PM.limit) {
				return setError(form, "", "Registrants limit reached");
			}

			const registrantsData = await db
				.insert(rememberingErlinda6PMTable)
				.values({
					fullName: form.data.fullName,
					address: form.data.address,
					dob: form.data.dob,
					email: form.data.email,
					contactNumber: form.data.contactNumber
				})
				.returning();

			registrantId = registrantsData[0].id;
			const email = registrantsData[0].email;

			const verificationCode = await generateEmailVerificationCode(registrantId, email);
			await sendEmail(
				email,
				"Remembering Erlinda 6PM Verification Code",
				rememberingErlinda6PM.generateCodeHTML(
					"Remembering Erlinda 6PM Verification Code",
					verificationCode
				)
			);
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				if (e.constraint_name === "remembering_erlinda_6_pm_email_unique") {
					return setError(form, "email", "Email already taken");
				}
				if (e.constraint_name === "remembering_erlinda_6_pm_contact_number_unique") {
					return setError(form, "contactNumber", "Contact Number already taken");
				}
			}
			return setError(form, "", "SERVER ERROR");
		}

		redirect(303, `/rememberingErlinda6PM/${registrantId}/email-verification`);
	}
};
