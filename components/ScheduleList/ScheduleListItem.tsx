import {  ProgramSchedule } from "@/typings"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

interface Props {
  schedule: ProgramSchedule
}
const ScheduleListItem = ({ schedule }: Props) => {
  return (
    <Card className="py-4">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-1">{schedule.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}
export default ScheduleListItem