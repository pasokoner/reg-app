import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is missing");
}

export default {
	schema: "./src/lib/server/db/schema.ts",
	out: "./drizzle/",
	driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		connectionString: process.env.DATABASE_URL
	}
} satisfies Config;
