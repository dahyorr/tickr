"use server"
import { db } from "@/lib/db"
import { clientsTable, eventClientsTable } from "@/lib/db/schema"
import { generatePairingCode } from "@/lib/utils"
import { eq } from "drizzle-orm"

export const updateClient = async (id: string, override?: Record<string, any>) => {
  await db.update(clientsTable)
    .set({
      lastActive: new Date(),
      ...override
    })
    .where(eq(clientsTable.id, id))
}

export const registerClient = async (id: string) => {
  const client = await db.insert(clientsTable)
    .values({
      id
    })
    .returning()
  return client[0]
}

export const getClient = async (id: string) => {
  const client = await db.query.clientsTable.findFirst({
    where: (clients, { eq }) => eq(clients.id, id)
  })
  return client
}

export const getClientByPairingCode = async (pairingCode: string) => {
  const client = await db.query.clientsTable.findFirst({
    where: (clients, { eq }) => eq(clients.pairingCode, pairingCode)
  })
  return client
}


export const getEventClients = async (eventId: string) => {
  const clients = await db
  .select()
  .from(eventClientsTable)
  .innerJoin(clientsTable, eq(eventClientsTable.clientId, clientsTable.id))
  .where(eq(eventClientsTable.eventId, eventId));
  return clients.map((client) => client.clients)
}

export const updatePairingCode = async (id: string) => {
  const updatedClient = await db.update(clientsTable)
    .set({
      pairingCode: generatePairingCode()
    })
    .where(eq(clientsTable.id, id))
    .returning()
  return updatedClient?.[0]
}


export type CreateEventClientActionState = {
  data: { clientKey: string } | null;
  error: null | string;
  success?: boolean;
}

export const createEventClientAction = async (_state: CreateEventClientActionState, formData: FormData) => {
  const clientKey = formData.get('clientKey') as string
  const eventId = formData.get('eventId') as string

  try {
    await createEventClient(eventId, clientKey)
    return {
      data: null,
      error: null,
      success: true,
    } as CreateEventClientActionState
  }
  catch (error) {
    console.log(error)
    let message = 'Failed to add client'
    if (error instanceof Error && error.message) {
      message = error.message
    }
    return {
      data: { clientKey },
      error: message,
      success: false,
    } as CreateEventClientActionState
  }
}

const createEventClient = async (eventId: string, clientKey: string) => {
  const client = await getClientByPairingCode(clientKey)
  if (!client) {
    throw new Error('Client not found')
  }
  await db.insert(eventClientsTable).values({
    eventId,
    clientId: client.id
  })
  await db.update(clientsTable)
    .set({
      requiresPairing: false,
      pairingCode: null
    })
    .where(eq(clientsTable.id, client.id))
}

// export const getClientsByEventId = async (eventId: string) => {
//   const clients = await db.query.clientsTable.findMany({
//     where: (clients, { eq }) => eq(clients.eventId, eventId)
//   })
//   return clients
// }