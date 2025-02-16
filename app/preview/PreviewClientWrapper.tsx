"use client"
import { useEffect, useState } from "react";
import TimerPreview from "@/components/TimerPreview"
import { useQuery } from "@tanstack/react-query";
import { TimeCue } from "@/typings";

interface Props {
  serverClientId?: string;
  generateClientId: () => Promise<string>;
  getPreviewQueue: (clientId: string) => Promise<TimeCue[]>;
}
const PreviewClientWrapper = ({ serverClientId, generateClientId, getPreviewQueue }: Props) => {
  const [clientId, setClientId] = useState(serverClientId || "")
  const { data: timerQueue } = useQuery({
    queryKey: ['preview', "queue", clientId],
    queryFn: () => getPreviewQueue(clientId),
  })

  const activeCue = timerQueue?.find((cue) => cue.active)

  useEffect(() => {
    if (!clientId) {
      generateClientId().then((newClientId) => {
        setClientId(newClientId)
      })
    }
  })

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-6xl font-bold">{activeCue?.name}</h1>
        <TimerPreview timerCue={activeCue} showHours largePreview />
      </div>

      <div className="absolute top-0 right-0 p-2">
        <p className="text-sm">ClientId: {clientId}</p>
      </div>
    </>
  )
}
export default PreviewClientWrapper