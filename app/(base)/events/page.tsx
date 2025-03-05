import EventsLoading from "./loading"
import { Button } from "@/components/ui/button"
import NewEventDialog from "@/components/dialogs/NewEventDialog"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import EventsList from "@/components/EventsList"
import { getEvents } from "@/server/events"

const EventsPage = () => {
  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Events</h1>
        <NewEventDialog >
          <Button className="">
            <Plus /> Create Event
          </Button>
        </NewEventDialog>
      </div>
      <Suspense fallback={<EventsLoading />}>
        <EventsList getEvents={getEvents} />
      </Suspense>
    </div>
  )
}
export default EventsPage