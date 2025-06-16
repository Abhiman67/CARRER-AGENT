import { defineConfig } from "drizzle-kit";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // <- ensure this exists in your .env file
  },
});
