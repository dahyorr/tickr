"use client"
import { ExternalLink, Pencil, Plus } from "lucide-react"
import NewSegmentDialog from "../dialogs/NewSegmentDialog"
import { Button } from "../ui/button"
import { ProgramSchedule, ScheduleSegment } from "@/typings"
import { useQuery } from "@tanstack/react-query"
import ListLoading from "../ListLoading"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import SegmentList from "../SegmentList"
import { TabsTrigger, Tabs, TabsList, TabsContent } from "../ui/tabs"
import Link from "next/link"

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
          <Link target="_blank" href={`/ctrl/${programId}/${scheduleId}`}>
            <Button className="">
              <ExternalLink /> Go to Control View
            </Button>
          </Link>
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

      <Suspense fallback={<ListLoading />}>
        <div className="flex justify-between  items-center my-2">
          <h2 className="text-xl">Segments</h2>

        </div>

        <SegmentList programId={programId} scheduleId={scheduleId} getScheduleSegments={getScheduleSegments} />
      </Suspense>
    </>
  )
}
export default ScheduleDetails