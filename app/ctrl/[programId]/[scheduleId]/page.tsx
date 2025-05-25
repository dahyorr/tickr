import { getProgramById } from "@/server/programs";
import { getProgramSchedule } from "@/server/schedule";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ControlLayoutPage = async ({ params }: { params: Promise<{ programId: string, scheduleId: string }> }) => {
  const programId = (await params).programId
  const scheduleId = (await params).scheduleId
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ["programs", programId, "schedules", scheduleId],
    queryFn: () => getProgramSchedule(programId, scheduleId),
  })

  queryClient.prefetchQuery({
    queryKey: ["programs", programId,],
    queryFn: () => getProgramById(programId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* < */}
    </HydrationBoundary>
  );
};

export default ControlLayoutPage;