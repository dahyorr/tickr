"use client"
import { useEffect, useState } from "react";
import TimerPreview from "@/components/TimerPreview"
import { useQuery } from "@tanstack/react-query";
import { Client, TimeCue } from "@/typings";
import PreviewClientPairing from "@/components/PreviewClientPairing";

interface Props {
  serverClientId?: string;
  serverClient?: Client;
  generateClientId: () => Promise<[string, Client]>;
  updatePairingCode: (id: string) => Promise<Client>;
  getPreviewQueue: (clientId: string) => Promise<TimeCue[]>;
}

const PreviewClientWrapper = ({ serverClientId, serverClient, updatePairingCode, generateClientId, getPreviewQueue }: Props) => {
  const [clientId, setClientId] = useState(serverClientId || "")
  const [client, setClient] = useState(serverClient)
  // const [ready, setReady] = useState(false)

  const canFetchQueue = !!clientId && !client?.requiresPairing

  const { data: timerQueue } = useQuery({
    queryKey: ['preview', "queue", clientId],
    queryFn: () => getPreviewQueue(clientId),
    enabled: canFetchQueue
  })

  const activeCue = timerQueue?.find((cue) => cue.active)

  useEffect(() => {
    if (clientId) return;
    generateClientId().then(([newClientId, newClient]) => {
      setClientId(newClientId)
      if (newClient.requiresPairing && !newClient.pairingCode) {
        updatePairingCode(newClientId).then((updatedClient) => {
          if (updatedClient) {
            setClient(updatedClient)
          }
          setClient(updatedClient)
        })
      }
      else {
        setClient(newClient)
      }
    })
  }, [clientId, updatePairingCode, generateClientId])

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">

        {client?.requiresPairing
          ? (<PreviewClientPairing pairingCode={client?.pairingCode || ""} />)
          : (
            <>
              <h1 className="text-6xl font-bold">{activeCue?.name}</h1>
              <TimerPreview timerCue={activeCue} showHours largePreview />
            </>)
        }
      </div>

      <div className="absolute top-0 right-0 p-2">
        <p className="text-sm">ClientId: {clientId}</p>
      </div>
    </>
  )
}
export default PreviewClientWrapper