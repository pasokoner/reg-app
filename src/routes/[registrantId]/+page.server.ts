import { db } from "$lib/server/db";
import { registrant } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const data = await db.select().from(registrant).where(eq(registrant.id, params.registrantId));

		return {
			registrant: data.length > 0 ? data[0] : undefined
		};
	} catch (e) {
		redirect(303, "/");
	}
};
