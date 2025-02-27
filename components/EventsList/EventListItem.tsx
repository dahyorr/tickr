import { Event } from "@/typings"
import { Card, CardContent, CardTitle } from "../ui/card"
import Link from "next/link"

interface Props {
  event: Event
}

const EventListItem = ({ event }: Props) => {
  return (
    <Link href={`/${event.shortId}/schedule`}>
      <Card>
        <CardContent>
          <CardTitle>{event.name}</CardTitle>
          <p className="truncate">{event.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
export default EventListItem