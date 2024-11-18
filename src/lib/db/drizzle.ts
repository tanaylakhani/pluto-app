import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(sql);
