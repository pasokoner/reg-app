import { z } from "zod";
// import { differenceInYears } from "date-fns";

export const regFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	dob: z.string().refine(
		(v) => {
			// const birthday = new Date(v);

			// const currentDate = new Date();

			// const age = differenceInYears(currentDate, birthday);

			return v;
		},
		{ message: "A date of birth is required." }
	),
	contactNumber: z.string().regex(new RegExp("^(09)[0-9]{9}$"), "Invalid mobile number"),
	emergencyContactName: z.string().trim().min(1, "Emergency contact name is required"),
	emergencyContactNumber: z.string().regex(new RegExp("^(09)[0-9]{9}$"), "Invalid mobile number"),
	address: z.string().trim().min(4, "Address is required"),
	position: z.string().min(1, "Please select a position"),
	childName: z.string().trim(),
	dpa: z.boolean().refine((v) => v)
});

export type RegFormSchema = typeof regFormSchema;
