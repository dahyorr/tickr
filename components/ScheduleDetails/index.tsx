"use client"
import { Pencil, Plus } from "lucide-react"
import NewSegmentDialog from "../dialogs/NewSegmentDialog"
import { Button } from "../ui/button"
import { ProgramSchedule, ScheduleSegment } from "@/typings"
import { useQuery } from "@tanstack/react-query"
import ListLoading from "../ListLoading"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import SegmentList from "../SegmentList"
import { TabsTrigger, Tabs, TabsList, TabsContent } from "../ui/tabs"

interface Props {
  getProgramSchedule: (programId: string, scheduleId: string) => Promise<ProgramSchedule>
  getScheduleSegments: (scheduleId: string) => Promise<ScheduleSegment[]>
  programId: string
  scheduleId: string
}
const ScheduleDetails = ({ scheduleId, programId, getProgramSchedule, getScheduleSegments }: Props) => {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ["programs", programId, "schedules", scheduleId],
    queryFn: () => getProgramSchedule(programId, scheduleId),
  })

  if (isLoading) {
    return <ListLoading />
  }
  if (!schedule) {
    return notFound()
  }
  // if (!schedule || schedules.length === 0) {
  //   return <GenericPlaceholder text="No Segments available" />
  // }


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{`${schedule?.title} ${schedule.title.includes("schedule") ? "" : "Schedule"}`}</h1>
        <div className="flex gap-2">
          <NewSegmentDialog programId={programId} scheduleId={scheduleId} >
            <Button className="">
              <Plus /> Add Segment
            </Button>
          </NewSegmentDialog>

          <Button className="">
            <Pencil /> Edit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="segments" >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="segments">
          <Suspense fallback={<ListLoading />}>
            <SegmentList programId={programId} scheduleId={scheduleId} getScheduleSegments={getScheduleSegments} />
          </Suspense>
        </TabsContent>

        <TabsContent value="settings">
          <Suspense fallback={<ListLoading />}>
            <SegmentList programId={programId} scheduleId={scheduleId} getScheduleSegments={getScheduleSegments} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  )
}
export default ScheduleDetails