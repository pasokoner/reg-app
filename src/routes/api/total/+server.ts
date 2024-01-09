import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { registrant } from "$lib/server/db/schema";
import { and, eq, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
	const leftTotalChild = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(and(eq(registrant.position, "left"), isNotNull(registrant.childName)));
	const leftTotal = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(and(eq(registrant.position, "left"), isNull(registrant.childName)));
	const rightTotalChild = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(and(eq(registrant.position, "right"), isNotNull(registrant.childName)));
	const rightTotal = await db
		.select({
			total: sql<number>`cast(count(${registrant.id}) as int)`
		})
		.from(registrant)
		.where(and(eq(registrant.position, "right"), isNull(registrant.childName)));

	return json({
		leftTotal: leftTotal[0].total + leftTotalChild[0].total * 2,
		rightTotal: rightTotal[0].total + rightTotalChild[0].total * 2
	});
};
