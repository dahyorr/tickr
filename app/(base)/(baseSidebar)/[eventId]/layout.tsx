import { getProgramById } from "@/server/programs"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const ProgramPageLayout = async ({ children, params }: { children: React.ReactNode, params: Promise<{ programId: string }> }) => {

  const programId = (await params).programId
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ["programs", programId],
    queryFn: () => getProgramById(programId),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
export default ProgramPageLayout