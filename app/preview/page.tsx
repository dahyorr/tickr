import { generateClientId } from "@/server/generateClientId"
import clsx from "clsx"
import { Orbitron } from 'next/font/google'
import { cookies } from "next/headers"
import PreviewClientWrapper from "@/app/preview/PreviewClientWrapper"
import { getPreviewQueue } from "@/server/getPreviewQueue"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getClient, updateClient, updatePairingCode } from "@/server/clients"
import { Client } from "@/typings"

const orbitron = Orbitron({
  subsets: ['latin'],
})

const TimerPreviewPage = async () => {
  let client: Client | undefined = undefined
  const cookiesStore = await cookies()
  const serverClientId = cookiesStore.get("clientId")?.value
  const queryClient = new QueryClient()

  if (serverClientId) {
    client = await getClient(serverClientId)
    if (client) {
      await updateClient(serverClientId)
      await queryClient.prefetchQuery({
        queryKey: ['preview', "queue", serverClientId],
        queryFn: () => getPreviewQueue(serverClientId || ""),
      })
    }

  }

  return (
    <div className={clsx(orbitron.className, "h-screen flex justify-center items-center relative")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PreviewClientWrapper
          serverClientId={serverClientId}
          generateClientId={generateClientId}
          updatePairingCode={updatePairingCode}
          getPreviewQueue={getPreviewQueue}
          serverClient={client}
        />
      </HydrationBoundary>
    </div>
  )
}
export default TimerPreviewPage