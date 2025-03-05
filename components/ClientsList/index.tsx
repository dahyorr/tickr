"use client"

import { Client } from "@/typings"
import ListLoading from "../ListLoading"
import { useQuery } from "@tanstack/react-query"
import NoClientsPlaceholder from "./NoClientsPlaceholder"
import ClientListItem from "./ClientListItem"

interface Props {
  getClients: (eventId: string) => Promise<Client[]>
  eventId: string
}
const ClientsList = ({ getClients, eventId }: Props) => {

  const { data: clients, isLoading } = useQuery({
    queryKey: ["events", eventId, "clients"],
    queryFn: () => getClients(eventId),
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