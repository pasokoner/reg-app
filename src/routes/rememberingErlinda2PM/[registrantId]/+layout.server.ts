import { db } from "$lib/server/db/index.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async (event) => {
	return {
		registrant: await db.query.rememberingErlinda2PMTable.findFirst({
			where: (registrant, { eq }) => eq(registrant.id, event.params.registrantId)
		})
	};
};
