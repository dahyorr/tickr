"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { createScheduleSegmentAction, CreateScheduleSegmentActionState } from "@/server/actions";
import { Textarea } from "../ui/textarea";

interface Props {
  children: React.ReactNode;
  programId: string;
  scheduleId: string;
}

const initialState: CreateScheduleSegmentActionState = {
  data: null,
  error: null,
}

const NewSegmentDialog = ({ children, programId, scheduleId }: Props) => {

  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<CreateScheduleSegmentActionState, FormData>(createScheduleSegmentAction, initialState)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["programs", programId, "schedules", scheduleId, "segments"],
      })
      toast.success("Segment added successfully")
    }
  }, [state, isPending, queryClient, programId, scheduleId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (<Button variant="outline">Add Segment</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 grid" action={formAction}>
          <DialogHeader>
            <DialogTitle>New Segment</DialogTitle>
            <DialogDescription>
              Add new segment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {state.error && <p className={"text-red-500 text-sm"}>{state.error}</p>}
            <div className="grid gap-3">
              <Label htmlFor="title">Segment Title</Label>
              <Input id="title" name="title" defaultValue={state.data?.title} required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Segment Description</Label>
              <Textarea id="description" name="description" defaultValue={state.data?.description || ""} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="duration">Segment Duration in seconds</Label>
              <Input id="duration" name="duration" type="number" defaultValue={state.data?.duration} required />
            </div>
            <Input id="scheduleId" name="scheduleId" type="hidden" defaultValue={scheduleId} required />
            <Input id="programId" name="programId" type="hidden" defaultValue={programId} required />

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (<>
                <Loader2 className="animate-spin" />
                Please wait
              </>) : "Add Segment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewSegmentDialog