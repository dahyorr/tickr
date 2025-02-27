import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import NewEventDialog from "./dialogs/NewEventDialog"

const NoEventPlaceholder = () => {
  return (
    <div className="flex-col flex items-center justify-center h-full w-full">
      {/* add event */}
      <div className="flex gap-2 items-center">
        <div className="bg-background flex items-center justify-center rounded-md size-16">
          <Plus className="size-8" />
        </div>
        <p className="text-lg">Add an event to get started</p>
      </div>
      <NewEventDialog >
        <Button className="">
          <Plus /> Create Event
        </Button>
      </NewEventDialog>
    </div>
  )
}
export default NoEventPlaceholder