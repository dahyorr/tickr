import NewClientDialog from "@/components/dialogs/NewClientDialog"
import { Button } from "@/components/ui/button"
import { getEventByShortId } from "@/server/events"
import { Plus } from "lucide-react"

const ClientsPage = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <NewClientDialog eventId={eventId} getEventByShortId={getEventByShortId}>
          <Button className="">
            <Plus /> Create Event
          </Button>
        </NewClientDialog>
      </div>
    </div>
  )
}
export default ClientsPage