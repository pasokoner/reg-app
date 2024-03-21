import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { sql, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { rememberingErlinda2PMTable } from "$lib/server/db/schema";

export const GET: RequestHandler = async () => {
	const registrationCount = await db
		.select({
			total: sql<number>`cast(count(${rememberingErlinda2PMTable.id}) as int)`
		})
		.from(rememberingErlinda2PMTable)
		.where(eq(rememberingErlinda2PMTable.email_verified, true));

	return json(registrationCount[0].total);
};
