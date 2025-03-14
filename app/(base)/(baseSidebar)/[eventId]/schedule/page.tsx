import NewScheduleDialog from "@/components/dialogs/NewScheduleDialog"
import ListLoading from "@/components/ListLoading"
import ScheduleList from "@/components/ScheduleList"
import { Button } from "@/components/ui/button"

import { getProgramSchedules } from "@/server/schedule"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Suspense } from "react"

const SchedulePage = async ({ params }: { params: Promise<{ programId: string }> }) => {
  const programId = (await params).programId
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ["programs", programId, "schedules"],
    queryFn: () => getProgramSchedules(programId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative mx-auto max-w-screen-xl  w-full px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Schedule</h1>
          <NewScheduleDialog programId={programId} >
            <Button className="">
              <Plus /> Add Timer
            </Button>
          </NewScheduleDialog>
        </div>
        <Suspense fallback={<ListLoading />}>
          <ScheduleList programId={programId} getProgramSchedules={getProgramSchedules} />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
export default SchedulePage