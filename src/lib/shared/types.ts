export type Registrant = {
	id: string;
	name: string;
	dob: string;
	contactNumber: string;
	emergencyContactName: string;
	emergencyContactNumber: string;
	address: string;
	position: string;
	childName: string | null;
	scanTime: string | null;
	createdAt: string;
};
