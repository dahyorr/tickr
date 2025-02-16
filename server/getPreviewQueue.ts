"use server"

import { TimeCue } from "@/typings"

export const getPreviewQueue = async (clientId: string) => {
  if (!clientId) {
    return []
  }
  return [
    {
      id: 1,
      timeLeft: 3100000,
      duration: 3600000,
      name: "Test Timer",
      active: true,
    },
  ] as TimeCue[]
}