import { Skeleton } from "@/components/ui/skeleton"

const ListLoading = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  )
}
export default ListLoading