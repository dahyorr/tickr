import { pgTable, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { customAlphabet, urlAlphabet } from "nanoid";
import { generatePairingCode } from "../utils";

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
    uniqueIndex("event_shortId_idx").on(table.shortId),
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

export const clientsTable = pgTable("clients", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  shortId: t.varchar().notNull().unique(),
  lastActive: t.timestamp(),
  requiresPairing: t.boolean().notNull().default(true),
  pairingCode: t.varchar().unique().$default(() => generatePairingCode()),
  ...timestamps,
}),
  (table) => [
    uniqueIndex("client_shortId_idx").on(table.shortId),
  ])

export const eventClientsTable = pgTable("event_clients", (t) => ({
  eventId: t.uuid("events").references(() => eventsTable.id),
  clientId: t.uuid("clients").references(() => clientsTable.id),
}))


