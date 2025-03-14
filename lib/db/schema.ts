import { pgTable, timestamp } from "drizzle-orm/pg-core";
import { customAlphabet, urlAlphabet } from "nanoid";
import { generatePairingCode } from "../utils";

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
}

const nanoid = customAlphabet(urlAlphabet, 12)

export const programsTable = pgTable("programs", (t) => ({
  id: t.varchar().primaryKey().$default(() => `pg-${nanoid()}`),
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
  programId: t.varchar("programs").references(() => programsTable.id),
  scheduleId: t.varchar("program_schedules").references(() => programSchedulesTable.id),
  active: t.boolean().notNull().default(true),
  ...timestamps
}))

export const programSchedulesTable = pgTable("program_schedules", (t) => ({
  id: t.varchar().primaryKey().$default(() => `sc-${nanoid()}`),
  title: t.varchar().notNull(),
  programId: t.varchar("programs").references(() => programsTable.id),
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

export const programClientsTable = pgTable("program_clients", (t) => ({
  programId: t.varchar("programs").references(() => programsTable.id),
  clientId: t.varchar("clients").references(() => clientsTable.id),
}))


