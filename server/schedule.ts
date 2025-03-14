"use server"

import { db } from "@/lib/db";
import { programSchedulesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const getProgramSchedules = async (programId: string) => {
  const schedules = await db
    .select()
    .from(programSchedulesTable)
    .where(eq(programSchedulesTable.programId, programId));
  return schedules
} 