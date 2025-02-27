import { pgTable, timestamp,uniqueIndex } from "drizzle-orm/pg-core";
import { customAlphabet, urlAlphabet } from "nanoid";

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
}

const nanoid = customAlphabet(urlAlphabet, 12)

export const eventsTable = pgTable("events", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.varchar().notNull(),
  description: t.varchar(),
  shortId: t.varchar().notNull().unique().$default(() => `ev-${nanoid()}`),
  date: t.date(),
  startTime: t.time(),
  endTime: t.time(),
  ...timestamps
}), 
(table) => [
  uniqueIndex("shortId_idx").on(table.shortId),
])

export const timersTable = pgTable("timers", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.varchar().notNull(),
  description: t.varchar(),
  duration: t.integer().notNull(),
  shortId: t.varchar().notNull().unique().$default(() => `ti-${nanoid()}`),
  eventId: t.uuid("events").references(() => eventsTable.id),
  ...timestamps
}))

