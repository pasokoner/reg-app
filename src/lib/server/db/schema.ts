import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const registrant = pgTable("registrant", {
	id: uuid("id")
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	name: text("name").notNull(),
	dob: timestamp("dob", { withTimezone: true, mode: "string" }).notNull(),
	contactNumber: text("contact_number").unique().notNull(),
	emergencyContactName: text("emergency_contact_name").notNull(),
	emergencyContactNumber: text("emergency_contact_number").notNull(),
	address: text("address").notNull(),
	position: text("position").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
});
