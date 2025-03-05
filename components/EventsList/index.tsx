"use client"

import { getEvents } from "@/server/events"
import { useQuery } from "@tanstack/react-query"
import EventsListLoading from "../ListLoading"
import NoEventPlaceholder from "./NoEventPlaceholder"
import EventListItem from "./EventListItem"
import { Event } from "@/typings"

interface Props {
  getEvents: () => Promise<Event[]>
}

const EventsList = ({ getEvents }: Props) => {

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  if (isLoading) {
    return <EventsListLoading />
  }
  if (!events || events.length === 0) {
    return <NoEventPlaceholder />
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  )
}
export default EventsList