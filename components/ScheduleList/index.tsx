"use client"
import { ProgramSchedule } from "@/typings"
import { useQuery } from "@tanstack/react-query"
import ListLoading from "../ListLoading"
import GenericPlaceholder from "../GenericPlaceholder"
import ScheduleListItem from "./ScheduleListItem"

interface Props {
  getProgramSchedules: (programId: string) => Promise<ProgramSchedule[]>
  programId: string
}
const ScheduleList = ({ programId, getProgramSchedules }: Props) => {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["programs", programId, "schedules"],
    queryFn: () => getProgramSchedules(programId),
  })

  if (isLoading) {
    return <ListLoading />
  }
  if (!schedules || schedules.length === 0) {
    return <GenericPlaceholder text="No schedules available" />
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {schedules.map((schedule) => (
        <ScheduleListItem key={schedule.id} schedule={schedule} />
      ))}
    </div>
  )
}
export default ScheduleList