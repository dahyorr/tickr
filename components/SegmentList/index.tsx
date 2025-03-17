"use client"
import { ScheduleSegment } from "@/typings"
import { useQuery } from "@tanstack/react-query"
import ListLoading from "../ListLoading"
import GenericPlaceholder from "../GenericPlaceholder"
import SegmentListItem from "./SegmentListItem"

interface Props {
  getScheduleSegments: (scheduleId: string,) => Promise<ScheduleSegment[]>
  programId: string
  scheduleId: string
}
const SegmentList = ({ scheduleId, programId, getScheduleSegments }: Props) => {
  const { data: segments, isLoading } = useQuery({
    queryKey: ["programs", programId, "schedules", scheduleId, "segments"],
    queryFn: () => getScheduleSegments(scheduleId),
  })

  if (isLoading) {
    return <ListLoading />
  }
  if (!segments || segments.length === 0) {
    return <GenericPlaceholder text="No segments available" />
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {segments.map((segment) => (
        <SegmentListItem key={segment.id} segment={segment} />
      ))}
    </div>
  )
}
export default SegmentList