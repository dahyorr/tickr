"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { createProgramScheduleAction, CreateProgramScheduleActionState } from "@/server/actions";

interface Props {
  children: React.ReactNode;
  programId: string;
}

const initialState: CreateProgramScheduleActionState = {
  data: null,
  error: null,
}

const NewScheduleDialog = ({ children, programId }: Props) => {

  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<CreateProgramScheduleActionState, FormData>(createProgramScheduleAction, initialState)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["programs", programId, "schedules"],
      })
      toast.success("Schedule added successfully")
    }
  }, [state, isPending, queryClient, programId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (<Button variant="outline">Add Schedule</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 grid" action={formAction}>
          <DialogHeader>
            <DialogTitle>New Schedule</DialogTitle>
            <DialogDescription>
              Add new schedule
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {state.error && <p className={"text-red-500 text-sm"}>{state.error}</p>}
            <div className="grid gap-3">
              <Label htmlFor="name-1">Schedule Name</Label>
              <Input id="title" name="title" defaultValue={state.data?.title} required />
            </div>
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
              </>) : "Add Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewScheduleDialog