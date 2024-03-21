import type { Actions, PageServerLoad } from "./$types";
import { emailVerificationSchema } from "$lib/zod-schemas";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";
import { generateEmailVerificationCode, sendEmail } from "$lib/server/email";
import { emailVerficationTable, rememberingErlinda2PMTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { rememberingErlinda2PM } from "$lib/config";

export const load: PageServerLoad = async (event) => {
	const { registrant } = await event.parent();

	if (!registrant) {
		redirect(302, "/rememberingErlinda2PM");
	}

	if (registrant.email_verified) {
		redirect(302, `/rememberingErlinda2PM/${registrant.id}`);
	}

	const email = await db
		.select({
			email: emailVerficationTable.email,
			expires_at: emailVerficationTable.expires_at
		})
		.from(emailVerficationTable)
		.where(eq(emailVerficationTable.registrantId, registrant.id));

	return {
		form: await superValidate(zod(emailVerificationSchema)),
		expires_at: email[0].expires_at,
		email: email[0].email
	};
};

export const actions = {
	verify: async (event) => {
		const form = await superValidate(event, zod(emailVerificationSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { code } = form.data;

		const verificationCode = await db.query.emailVerficationTable.findFirst({
			where: (emailVerification, { eq }) =>
				eq(emailVerification.registrantId, event.params.registrantId)
		});

		if (!verificationCode || verificationCode.code !== code) {
			return setError(form, "", "Invalid code");
		}

		if (!isWithinExpirationDate(new Date(verificationCode.expires_at))) {
			return setError(form, "", "Code already expired");
		}

		if (verificationCode.registrantId !== verificationCode.registrantId) {
			return setError(form, "", "Invalid code");
		}

		const verifiedRegistrant = await db.transaction(async (tx) => {
			await tx
				.delete(emailVerficationTable)
				.where(eq(emailVerficationTable.id, verificationCode.id))
				.execute();

			const verifiedRegistrant = await tx
				.update(rememberingErlinda2PMTable)
				.set({
					email_verified: true
				})
				.where(eq(rememberingErlinda2PMTable.id, event.params.registrantId))
				.returning()
				.execute();

			return verifiedRegistrant[0];
		});

		await sendEmail(
			verifiedRegistrant.email,
			"Email has been verified",
			rememberingErlinda2PM.generateQrHTML("Email has been verified", verifiedRegistrant.id)
		);

		redirect(302, "/rememberingErlinda2PM/" + event.params.registrantId);
	},
	resend: async (event) => {
		const registrant = await db.query.rememberingErlinda2PMTable.findFirst({
			where: (registrant, { eq }) => eq(registrant.id, event.params.registrantId)
		});

		if (!registrant) {
			return { message: "Registrant not found" };
		}

		const verificationCode = await generateEmailVerificationCode(registrant.id, registrant.email);
		await sendEmail(
			registrant.email,
			"Remembering Erlinda 2PM Verification Code",
			rememberingErlinda2PM.generateCodeHTML(
				"Remembering Erlinda 2PM Verification Code",
				verificationCode
			)
		);

		return { message: "email verification code sent" };
	}
} satisfies Actions;
