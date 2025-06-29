// import "dotenv/config" // this shit doesn't work for .env.local
import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// console.log("Database_url:", process.env.DATABASE_URL)

const sql = neon(process.env.DATABASE_URL!);

// logger
// const db = drizzle({ client: sql, logger: true});
const db = drizzle({ client: sql});

export { db }