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
  id: t.varchar().primaryKey().$default(() => `ev-${nanoid()}`),
  name: t.varchar().notNull(),
  description: t.varchar(),
  date: t.date(),
  startTime: t.time(),
  endTime: t.time(),
  ...timestamps
}))

export const timersTable = pgTable("timers", (t) => ({
  id: t.varchar().primaryKey().$default(() => `ti-${nanoid()}`),
  title: t.varchar().notNull(),
  description: t.varchar(),
  duration: t.integer().notNull(),
  eventId: t.varchar("events").references(() => eventsTable.id),
  ...timestamps
}))

export const clientsTable = pgTable("clients", (t) => ({
  id: t.varchar().primaryKey().$default(() => `cl-${nanoid()}`),
  lastActive: t.timestamp(),
  requiresPairing: t.boolean().notNull().default(true),
  pairingCode: t.varchar().unique().$default(() => generatePairingCode()),
  ...timestamps,
}),
)

export const eventClientsTable = pgTable("event_clients", (t) => ({
  eventId: t.varchar("events").references(() => eventsTable.id),
  clientId: t.varchar("clients").references(() => clientsTable.id),
}))


