"use server"

import { db } from "@/lib/db"
import { segmentsTable } from "@/lib/db/schema"
import { ScheduleSegment, ScheduleSegmentInput } from "@/typings"
import { and, eq, isNull } from "drizzle-orm"

export const createScheduleSegment = async (segment: ScheduleSegmentInput) => {
  if (!segment.scheduleId) {
    throw new Error("Schedule Id is required")
  }
  if (!segment.programId) {
    throw new Error("Program Id is required")
  }
  const lastSegment = await getLastSegment(segment.scheduleId)
  segment.orderIndex = lastSegment ? lastSegment.orderIndex + 1 : 0
  const createdSegment = await db.insert(segmentsTable).values(segment).returning()
  if (lastSegment) {
    await updateLastSegmentwithNextSegment(lastSegment, createdSegment?.[0]?.id)
  }
  return createdSegment?.[0]
}

const getLastSegment = async (scheduleId: string) => {
  const lastSegment = await db
    .select()
    .from(segmentsTable)
    .where(and(eq(segmentsTable.scheduleId, scheduleId), isNull(segmentsTable.nextSegmentId)))
    .limit(1)
  return lastSegment?.[0]
}

export const updateLastSegmentwithNextSegment = async (segment: ScheduleSegment, nextSegmentId: string) => {
  await db.update(segmentsTable).set({ nextSegmentId }).where(eq(segmentsTable.id, segment.id))
}

export const getScheduleSegments = async (scheduleId: string) => {
  const segments = await db
    .select()
    .from(segmentsTable)
    .where(eq(segmentsTable.scheduleId, scheduleId))
    .orderBy(segmentsTable.orderIndex)
  return segments
}