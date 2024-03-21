import { z } from "zod";

export const registrationFormSchema = z.object({
	fullName: z.string().trim().min(1, "Full name is required").max(255, "Full name is too long"),
	dob: z.string().trim().min(1, "Date of birth is required"),
	school: z.string().trim().min(1, "School is required").max(500, "School is too long"),
	email: z
		.string()
		.trim()
		.email("Invalid email")
		.refine(
			(v) => {
				return !v.includes("+");
			},
			{
				message: "Email can't contain the character +"
			}
		),
	contactNumber: z
		.string()
		.trim()
		.refine(
			(v) => {
				if (v.substring(0, 2) !== "09" || v.length !== 11) {
					return false;
				}
				// 0912345678A -- EXPECTED TO FAIL
				// 09123456789 -- EXPECTED TO SUCCESS
				for (let i = 0; i < v.length; i++) {
					if (isNaN(parseInt(v[i]))) {
						return false;
					}
				}

				return true;
			},
			{ message: "Invalid mobile number" }
		)
});

export type RegistrationFormSchema = typeof registrationFormSchema;
