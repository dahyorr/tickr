"use server"

import { db } from "@/lib/db";
import { programSchedulesTable } from "@/lib/db/schema";
import { ProgramSchedule, ProgramScheduleInput } from "@/typings";
import { eq, and } from "drizzle-orm";

export const getProgramSchedules = async (programId: string) => {
  const schedules = await db
    .select()
    .from(programSchedulesTable)
    .where(eq(programSchedulesTable.programId, programId));
  return schedules
}

export const createProgramSchedule = async (schedule: ProgramScheduleInput) => {
  const createdSchedule = await db.insert(programSchedulesTable).values(schedule).returning()
  return createdSchedule?.[0]
}

export const getProgramSchedule = async (programId: string, scheduleId: string) => {
  const schedule = await db
    .select()
    .from(programSchedulesTable)
    .where(and(eq(programSchedulesTable.programId, programId), eq(programSchedulesTable.id, scheduleId)))
  return schedule?.[0]
}