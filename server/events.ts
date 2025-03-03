"use server"

import { db } from "@/lib/db"
import { eventsTable } from "@/lib/db/schema"
import { Event, EventInput } from "@/typings"

// TODO: Restrict to users
// const eventsPlaceholder = [
//   {
//     name: "Acme Inc",
//   },
//   {
//     name: "Acme Corp.",
//   },
//   {
//     name: "Evil Corp.",
//   },
// ]

export const getEvents = async () => {
  const events = await db.query.eventsTable.findMany()
  // return eventsPlaceholder
  return events

}

export const getEventById = async (id: string) => {
  const event = await db.query.eventsTable.findFirst({
    where: (events, { eq }) => eq(events.id, id),
  })
  return event
}

export const getEventByShortId = async (id: string) => {
  const event = await db.query.eventsTable.findFirst({
    where: (events, { eq }) => eq(events.shortId, id),
  })
  return event
}

export const createEvent = async (event: EventInput) => {
  const createdEvent = await db.insert(eventsTable).values(event).returning()
  return createdEvent[0]
}

export type CreateEventActionState = {
  data: Event | null;
  error: null | string;
  success?: boolean;
}

export const createEventAction = async (_state: CreateEventActionState, formData: FormData) => {
  const rawEvent: EventInput = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string
    // startTime: formData.get("startTime") as string,
    // endTime: formData.get("endTime") as string
  }

  try {
    const createdEvent = await createEvent(rawEvent)
    return {
      data: createdEvent,
      error: null,
      success: true,
    } as CreateEventActionState
  }
  catch (error) {
    console.log(error)
    let message = 'Failed to create event'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    return {
      data: rawEvent,
      error: message,
      success: false,
    } as CreateEventActionState
  }
}