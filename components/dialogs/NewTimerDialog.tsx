"use client"
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createProgramClientAction, CreateProgramClientActionState } from "@/server/actions";
import { Program } from "@/typings";

interface Props {
  children: React.ReactNode;
  programId: string;
  getProgramById: (id: string) => Promise<Program | undefined>;
}

const initialState: CreateProgramClientActionState = {
  data: null,
  error: null,
}

const NewTimerDialog = ({ children, programId, getProgramById }: Props) => {

  const { data: program } = useQuery({
    queryKey: ["programs", programId],
    queryFn: () => getProgramById(programId),
  })
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState<CreateProgramClientActionState, FormData>(createProgramClientAction, initialState)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (state.success && state.data && !isPending) {
      setOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["programs", programId, "clients"],
      })
      toast.success("Client added successfully")
    }
  }, [state, isPending, queryClient, programId])

  if (!program) return null
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (<Button variant="outline">Add Client</Button>)}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 grid" action={formAction}>
          <DialogHeader>
            <DialogTitle>New Client</DialogTitle>
            <DialogDescription>
              Add new client
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {state.error && <p className={"text-red-500 text-sm"}>{state.error}</p>}
            <div className="grid gap-3">
              <Label htmlFor="name-1">Client Pairing Key</Label>
              <Input id="clientKey" name="clientKey" defaultValue={state.data?.clientKey} required />
            </div>
            <Input id="programId" name="programId" type="hidden" defaultValue={program.id} required />

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (<>
                <Loader2 className="animate-spin" />
                Please wait
              </>) : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default NewTimerDialog