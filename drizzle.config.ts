import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();
export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:le8bJ3GcaiwB@ep-wild-lake-a8m9gq22.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
