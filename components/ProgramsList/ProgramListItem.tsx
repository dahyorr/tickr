import { Program } from "@/typings"
import { Card, CardContent, CardTitle } from "../ui/card"
import Link from "next/link"

interface Props {
  program: Program
}

const ProgramListItem = ({ program }: Props) => {
  return (
    <Link href={`/${program.id}/schedule`}>
      <Card>
        <CardContent>
          <CardTitle>{program.name}</CardTitle>
          <p className="truncate">{program.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
export default ProgramListItem