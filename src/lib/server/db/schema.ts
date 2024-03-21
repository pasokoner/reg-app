import { date, pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";

export const rememberingErlinda2PMTable = pgTable("remembering_erlinda_2_pm", {
	id: uuid("id").defaultRandom().primaryKey(),
	fullName: text("full_name").notNull(),
	dob: date("dob").notNull(),
	school: text("school").notNull(),
	contactNumber: text("contact_number").notNull().unique(),
	email: text("email").notNull().unique(),
	email_verified: boolean("email_verified").default(false).notNull(),
	used: boolean("used").default(false)
});

export const emailVerficationTable = pgTable("email_verification", {
	id: uuid("id").defaultRandom().primaryKey(),
	code: text("code").notNull(),
	email: text("email").notNull(),
	registrantId: uuid("registrantId").notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull()
});
