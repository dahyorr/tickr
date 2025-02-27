import { defineConfig } from 'drizzle-kit';
import { config } from "dotenv";

config({ path: ".env.local" }); // or .env.local

export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});