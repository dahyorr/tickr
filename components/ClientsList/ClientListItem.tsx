import { Client } from "@/typings"
import { Card, CardContent, CardTitle } from "../ui/card"
import dayjs from "dayjs"
import { Button } from "../ui/button"

interface Props {
  client: Client
}
const ClientListItem = ({ client }: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="mb-1">{client.id}</CardTitle>
            <p className="truncate">Last Active: {dayjs(client?.lastActive).toString()}</p>
          </div>
          <div>
            <Button>Remove</Button>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}
export default ClientListItem