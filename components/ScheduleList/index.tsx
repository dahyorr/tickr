import { ProgramSchedule } from "@/typings"

interface Props {
  getProgramSchedules: (programId: string) => Promise<ProgramSchedule[]>
  programId: string
}
const ScheduleList = ({}: Props) => {
  return (
    <div>ScheduleList</div>
  )
}
export default ScheduleList