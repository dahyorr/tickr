// import { cookies } from "next/headers"
import Navbar from "@/components/Navbar";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getEvents } from "@/server/events";

export async function BaseLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="[--header-height:calc(--spacing(14))]">
        <Navbar />
        <div className="h-(--header-height)" />
        {children}
      </div>
    </HydrationBoundary>

  )
}


export default BaseLayout
