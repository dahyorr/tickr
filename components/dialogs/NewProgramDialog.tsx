"use client"
import { createProgramAction, CreateProgramActionState } from "@/server/actions";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}


const initialState: CreateProgramActionState = {
  data: null,
  error: null,
}
const NewProgramDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<CreateProgramActionState, FormData>(createProgramAction, initialState)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["programs"],
      })
      toast.success("Program created successfully")
    }
  }, [state, isPending, queryClient])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (<Button variant="outline">Create Program</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 grid" action={formAction}>
          <DialogHeader>
            <DialogTitle>New Program</DialogTitle>
            <DialogDescription>
              Create a new program to get started
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {state.error && <p className={"text-red-500 text-sm"}>{state.error}</p>}
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name" name="name" defaultValue={state.data?.name} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={state.data?.description || ""} required />
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
export default NewProgramDialog