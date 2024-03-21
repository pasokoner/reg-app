import type { PageServerLoad, Actions } from "./$types.js";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import { cameraSchema } from "$lib/zod-schemas.js";
import { db } from "$lib/server/db/index.js";
import { rememberingErlinda2PMTable } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(cameraSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(cameraSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const registrant = await db.query.rememberingErlinda2PMTable
				.findFirst({
					where: (currentEvent, { eq }) => eq(currentEvent.id, form.data.registrantId)
				})
				.execute();

			if (!registrant) {
				return setError(form, "", "Registrant not found");
			}

			if (registrant.used) {
				return setError(form, "", "QR Code already used");
			}

			await db
				.update(rememberingErlinda2PMTable)
				.set({
					used: true
				})
				.where(eq(rememberingErlinda2PMTable.id, registrant.id));
		} catch (e) {
			return setError(form, "", "SERVER ERROR");
		}

		return {
			form
		};
	}
};
