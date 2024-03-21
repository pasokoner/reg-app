import { z } from "zod";

export const cameraSchema = z.object({
	registrantId: z.string().min(1, "Registrant QR is required")
});

export type CameraSchema = typeof cameraSchema;

export const emailVerificationSchema = z.object({
	code: z.string().length(6, { message: "Invalid Code" })
});

export type EmailVerficationSchema = typeof emailVerificationSchema;
