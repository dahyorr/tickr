import { ScheduleSegment } from "@/typings"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"

interface Props {
  segment: ScheduleSegment
}
const SegmentListItem = ({ segment }: Props) => {
  return (
    <Link href={segment.id}>
      <Card className="py-4">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="mb-1">{segment.title}</CardTitle>
              <CardTitle className="mb-1">{segment.duration / 1000}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
export default SegmentListItem