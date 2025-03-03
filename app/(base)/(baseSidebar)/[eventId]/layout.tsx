import { getEventByShortId } from "@/server/events"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const EventPageLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ eventId: string }> }) => {

  const eventId = (await params).eventId
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEventByShortId(eventId),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
export default EventPageLayout