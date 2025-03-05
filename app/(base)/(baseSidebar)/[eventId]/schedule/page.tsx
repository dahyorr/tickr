import ClientsList from "@/components/ClientsList"
import NewClientDialog from "@/components/dialogs/NewClientDialog"
import ListLoading from "@/components/ListLoading"
import { Button } from "@/components/ui/button"
// import { getEventClients } from "@/server/clients"
// import { getEventById } from "@/server/events"
// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
// import { Suspense } from "react"

const SchedulePage = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId

  return (
    <div className="h-full w-full">
      <div className="relative mx-auto max-w-screen-xl  w-full px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Schedule</h1>
          {/* <NewClientDialog eventId={eventId} getEventById={getEventById}>
            <Button className="">
              <Plus /> Add Timer
            </Button>
          </NewClientDialog> */}
        </div>

      </div>
    </div>
  )
}
export default SchedulePage