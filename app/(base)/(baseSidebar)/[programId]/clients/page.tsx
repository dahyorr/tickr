import ClientsList from "@/components/ClientsList"
import NewClientDialog from "@/components/dialogs/NewClientDialog"
import ListLoading from "@/components/ListLoading"
import { Button } from "@/components/ui/button"
import { getProgramClients } from "@/server/clients"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Suspense } from "react"

const ClientsPage = async ({ params }: { params: Promise<{ programId: string }> }) => {
  const programId = (await params).programId
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ["programs", programId, "programs"],
    queryFn: () => getProgramClients(programId),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative mx-auto max-w-screen-xl  w-full px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Clients</h1>
          <NewClientDialog programId={programId}>
            <Button className="">
              <Plus /> Add Client
            </Button>
          </NewClientDialog>
        </div>
        <Suspense fallback={<ListLoading />}>
          <ClientsList programId={programId} getClients={getProgramClients} />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
export default ClientsPage