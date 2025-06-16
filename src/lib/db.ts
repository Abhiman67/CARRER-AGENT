import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
import { usersTable } from "@/lib/schema";

// Example: Insert user
await db.insert(usersTable).values({
  name: "Abhishek",
  email: "abhishek@example.com"
}).onConflictDoNothing();

// Example: Fetch all users
const allUsers = await db.select().from(usersTable);
