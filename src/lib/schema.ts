import { pgTable, varchar,serial, json, integer, timestamp } from "drizzle-orm/pg-core";



export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(), // ✅ ensures auto-incrementing
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const historyTable = pgTable("historyTable", {
  id: integer("id").primaryKey().default(0), // or use serial() if fixed
  recordId: varchar("recordId", { length: 255 }).notNull(),
  content: json("content"),
  userEmail: varchar("userEmail", { length: 255 }).references(() => usersTable.email),
  createdAt: varchar("createdAt", { length: 255 }).default(new Date().toISOString()),
});