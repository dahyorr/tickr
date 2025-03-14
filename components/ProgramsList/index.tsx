"use client"
import { useQuery } from "@tanstack/react-query"
import ListLoading from "../ListLoading"
import ProgramListItem from "./ProgramListItem"
import { Program } from "@/typings"
import GenericPlaceholder from "../GenericPlaceholder"

interface Props {
  getPrograms: () => Promise<Program[]>
}

const ProgramsList = ({ getPrograms }: Props) => {

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  })

  if (isLoading) {
    return <ListLoading />
  }
  if (!programs || programs.length === 0) {
    return <GenericPlaceholder text="No Programs Available" />
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {programs.map((program) => (
        <ProgramListItem key={program.id} program={program} />
      ))}
    </div>
  )
}
export default ProgramsList