import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { db } from "./db";
import { emailVerficationTable } from "./db/schema";
import { eq } from "drizzle-orm";

import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "$env/static/private";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: GOOGLE_EMAIL,
		pass: GOOGLE_EMAIL_PASSWORD
	}
});

export async function generateEmailVerificationCode(
	registrantId: string,
	email: string
): Promise<string> {
	await db
		.delete(emailVerficationTable)
		.where(eq(emailVerficationTable.registrantId, registrantId))
		.execute();
	const code = generateRandomString(6, alphabet("0-9"));

	await db.insert(emailVerficationTable).values({
		registrantId,
		email,
		code,
		expires_at: createDate(new TimeSpan(5, "m")) // 5 minutes,
	});

	return code;
}

export async function sendEmail(to: string, subject: string, html: string) {
	const message: MailOptions = {
		from: GOOGLE_EMAIL,
		to,
		subject,
		html
	};

	await transporter.sendMail(message);
}
