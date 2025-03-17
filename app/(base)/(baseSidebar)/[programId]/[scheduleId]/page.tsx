import ListLoading from "@/components/ListLoading"
import ScheduleDetails from "@/components/ScheduleDetails"
import { getProgramSchedule } from "@/server/schedule"
import { getScheduleSegments } from "@/server/segments"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

import { Suspense } from "react"

const SchedulePage = async ({ params }: { params: Promise<{ programId: string, scheduleId: string }> }) => {
  const programId = (await params).programId
  const scheduleId = (await params).scheduleId
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ["programs", programId, "schedules", scheduleId],
    queryFn: () => getProgramSchedule(programId, scheduleId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative mx-auto max-w-screen-xl  w-full px-4 py-4">

        <Suspense fallback={<ListLoading />}>
          <ScheduleDetails programId={programId} scheduleId={scheduleId} getProgramSchedule={getProgramSchedule} getScheduleSegments={getScheduleSegments} />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
export default SchedulePage