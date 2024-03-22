export const rememberingErlinda2PM = {
	limit: 1000,
	address: "PENELCO HIGHWAY",
	date: "April 5, 2024 - 2:00PM",
	schools: ["SCHOOL 1", "SCHOOl 2", "SCHOOL 3"],
	generateQrHTML: (subject: string, registrantId: string) => {
		return `
			<h1>You are now registered to ${subject}</h1>
			<p>Click the link below to view your ticket</p>
			<a href="https://pgbregapp.vercel.app/rememberingErlinda2PM/${registrantId}">QR Code Ticket</a>
		`;
	},
	generateCodeHTML: (subject: string, code: string) => {
		return `
			<h1>${subject}</h1>
			<p>${code}</p>
		`;
	}
};

export const rememberingErlinda6PM = {
	limit: 1000,
	address: "PENELCO HIGHWAY",
	date: "April 5, 2024 - 6:00PM",
	generateQrHTML: (subject: string, registrantId: string) => {
		return `
			<h1>You are now registered to ${subject}</h1>
			<p>Click the link below to view your ticket</p>
			<a href="https://pgbregapp.vercel.app/rememberingErlinda6PM/${registrantId}">QR Code Ticket</a>
		`;
	},
	generateCodeHTML: (subject: string, code: string) => {
		return `
			<h1>${subject}</h1>
			<p>${code}</p>
		`;
	}
};
