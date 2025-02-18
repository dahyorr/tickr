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

const orbitron = Orbitron({
  subsets: ['latin'],
})

const TimerPreviewPage = async () => {
  const cookiesStore = await cookies()
  const serverClientId = cookiesStore.get("clientId")?.value
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['preview', "queue", serverClientId],
    queryFn: () => getPreviewQueue(serverClientId || ""),
  })

  return (
    <div className={clsx(orbitron.className, "h-screen flex justify-center items-center relative")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PreviewClientWrapper serverClientId={serverClientId} generateClientId={generateClientId} getPreviewQueue={getPreviewQueue} />
      </HydrationBoundary>
    </div>
  )
}
export default TimerPreviewPage