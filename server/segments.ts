"use server"

import { db } from "@/lib/db"
import { segmentsTable } from "@/lib/db/schema"
import { ScheduleSegmentInput } from "@/typings"
import { and, eq, isNull } from "drizzle-orm"

export const createScheduleSegment = async (segment: ScheduleSegmentInput) => {
  if (!segment.scheduleId) {
    throw new Error("Schedule Id is required")
  }
  if (!segment.programId) {
    throw new Error("Program Id is required")
  }
  const lastSegmentId = await getLastSegmentId(segment.scheduleId)
  const createdSegment = await db.insert(segmentsTable).values(segment).returning()
  if (lastSegmentId) {
    await updateLastSegmentwithNextSegment(lastSegmentId, createdSegment?.[0]?.id)
  }
  return createdSegment?.[0]
}

const getLastSegmentId = async (scheduleId: string) => {
  const lastSegment = await db
    .select()
    .from(segmentsTable)
    .where(and(eq(segmentsTable.scheduleId, scheduleId), isNull(segmentsTable.nextSegmentId)))
    .limit(1)
  return lastSegment?.[0]?.id
}

export const updateLastSegmentwithNextSegment = async (segmentId: string, nextSegmentId: string) => {
  await db.update(segmentsTable).set({ nextSegmentId }).where(eq(segmentsTable.id, segmentId))
}

export const getScheduleSegments = async (scheduleId: string) => {
  const segments = await db
    .select()
    .from(segmentsTable)
    .where(eq(segmentsTable.scheduleId, scheduleId))
  return segments
}