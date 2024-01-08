import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { registrant } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
	const leftTotal = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(eq(registrant.position, "left"));
	const rightTotal = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(eq(registrant.position, "right"));

	return json({
		leftTotal: leftTotal[0].total,
		rightTotal: rightTotal[0].total
	});
};
