import ProgramsLoading from "./loading"
import { Button } from "@/components/ui/button"
import NewProgramDialog from "@/components/dialogs/NewProgramDialog"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import ProgramsList from "@/components/ProgramsList"
import { getPrograms } from "@/server/programs"

const ProgramsPage = () => {
  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Programs</h1>
        <NewProgramDialog >
          <Button className="">
            <Plus /> Create Program
          </Button>
        </NewProgramDialog>
      </div>
      <Suspense fallback={<ProgramsLoading />}>
        <ProgramsList getPrograms={getPrograms} />
      </Suspense>
    </div>
  )
}
export default ProgramsPage