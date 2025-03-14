"use server"
import { db } from "@/lib/db"
import { clientsTable, programClientsTable } from "@/lib/db/schema"
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


export const getProgramClients = async (programId: string) => {
  const clients = await db
    .select()
    .from(programClientsTable)
    .innerJoin(clientsTable, eq(programClientsTable.clientId, clientsTable.id))
    .where(eq(programClientsTable.programId, programId));
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

export const createProgramClient = async (programId: string, clientKey: string) => {
  const client = await getClientByPairingCode(clientKey)
  if (!client) {
    throw new Error('Client not found')
  }
  await db.insert(programClientsTable).values({
    programId,
    clientId: client.id
  })
  await db.update(clientsTable)
    .set({
      requiresPairing: false,
      pairingCode: null
    })
    .where(eq(clientsTable.id, client.id))
}

// export const getClientsByProgramId = async (programId: string) => {
//   const clients = await db.query.clientsTable.findMany({
//     where: (clients, { eq }) => eq(clients.programId, programId)
//   })
//   return clients
// }