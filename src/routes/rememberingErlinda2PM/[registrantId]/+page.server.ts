import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const { registrant } = await event.parent();

	if (!registrant) {
		redirect(302, "/rememberingErlinda2PM");
	}

	return {};
};
