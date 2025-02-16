"use server"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"

export const generateClientId = async () => {
  const clientId = `cl-${nanoid(10)}`
  const cookieStore = await cookies()
  cookieStore.set("clientId", clientId, {
    path: "/preview",
    httpOnly: true,
    sameSite: "strict",
  })
  return clientId
}