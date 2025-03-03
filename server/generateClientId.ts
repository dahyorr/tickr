"use server"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"
import { registerClient } from "./clients"
import { Client } from "@/typings"

export const generateClientId = async () => {
  const clientId = `cl-${nanoid(10)}`
  const cookieStore = await cookies()
  cookieStore.set("clientId", clientId, {
    path: "/preview",
    httpOnly: true,
    sameSite: "strict",
  })
  const client = await registerClient(clientId)
  return [clientId, client] as [string, Client]
}