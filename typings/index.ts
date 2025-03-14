import { clientsTable, programSchedulesTable, programsTable } from "@/lib/db/schema";

export interface TimeCue {
  id: number;
  duration: number;  // in milliseconds
  timeLeft: number;  // in milliseconds
  name: string;
  active: boolean;
  // createdAt: Date;

}

export interface PreviewStore {
  clientId: string;
  timerQueue: TimeCue[];
}

export interface TimeBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export enum TimeUnitInMilliseconds {
  milliseconds = 1,
  seconds = 1000,
  minutes = 60000,
  hours = 3600000,
  days = 86400000,
}

export type Program = typeof programsTable.$inferSelect
export type ProgramInput = typeof programsTable.$inferInsert

export type Client = typeof clientsTable.$inferSelect
export type ClientInput = typeof clientsTable.$inferInsert

export type ProgramSchedule = typeof programSchedulesTable.$inferSelect
export type ProgramScheduleInput = typeof programSchedulesTable.$inferInsert