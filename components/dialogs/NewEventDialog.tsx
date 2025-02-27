"use client"
import { createEventAction, CreateEventActionState } from "@/server/events";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}


const initialState: CreateEventActionState = {
  data: null,
  error: null,
}
const NewEventDialog = ({ children }: Props) => {
  const [state, formAction, isPending] = useActionState<CreateEventActionState, FormData>(createEventAction, initialState)

  useEffect(() => {
    if (state.success && state.data && !isPending) {
      toast.success("Event created successfully")
    }
  }, [state, isPending])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (<Button variant="outline">Create Profile</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 grid" action={formAction}>
          <DialogHeader>
            <DialogTitle>New Event</DialogTitle>
            <DialogDescription>
              Create a new event to get started
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (<>
                <Loader2 className="animate-spin" />
                Please wait
              </>) : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewEventDialog