// import EventSwitcherClient from "./client"

import { getEvents } from "@/server/events"
import EventSwitcherClient from "./client"

const EventSwitcher = async  () => {
  const events = await getEvents()
  console.log(events)

  return (
    <>
      <EventSwitcherClient events={events} />
    </>
  )
}

export default EventSwitcher
