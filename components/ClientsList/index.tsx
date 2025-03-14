"use client"

import { Client } from "@/typings"
import ListLoading from "../ListLoading"
import { useQuery } from "@tanstack/react-query"
import NoClientsPlaceholder from "./NoClientsPlaceholder"
import ClientListItem from "./ClientListItem"

interface Props {
  getClients: (programId: string) => Promise<Client[]>
  programId: string
}
const ClientsList = ({ getClients, programId }: Props) => {

  const { data: clients, isLoading } = useQuery({
    queryKey: ["programs", programId, "clients"],
    queryFn: () => getClients(programId),
  })
  if (isLoading) {
    return <ListLoading />
  }
  if (!clients || clients.length === 0) {
    return <NoClientsPlaceholder />
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {clients.map((client) => (
        <ClientListItem key={client.id} client={client} />
      ))}
    </div>
  )
}
export default ClientsList