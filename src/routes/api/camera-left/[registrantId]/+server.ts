import { db } from "$lib/server/db";
import { registrant } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";
import postgres from "postgres";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
	const { registrantId } = params;

	try {
		const data = await db.select().from(registrant).where(eq(registrant.id, registrantId));

		if (data.length === 0) {
			return new Response(JSON.stringify({ message: "Invalid qr code" }), { status: 401 });
		}

		if (data[0].scanTime) {
			return new Response(JSON.stringify({ message: "The QR Code has already been used" }), {
				status: 401
			});
		}

		if (data[0].position === "right") {
			return new Response(JSON.stringify({ message: "Please proceed to right area" }), {
				status: 401
			});
		}

		const reg = await db
			.update(registrant)
			.set({
				scanTime: new Date().toISOString()
			})
			.where(eq(registrant.id, registrantId))
			.returning();

		return json({
			registrant: reg[0]
		});
	} catch (e) {
		if (e instanceof postgres.PostgresError && e.code === "22P02") {
			return new Response(JSON.stringify({ message: "Invalid qr code" }), { status: 401 });
		}

		return new Response(JSON.stringify({ message: "Unknown error" }), { status: 401 });
	}
};
