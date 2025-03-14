"use client"
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Program } from "@/typings"
import NewProgramDialog from "../dialogs/NewProgramDialog"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"

interface Props {
  getPrograms: () => Promise<Program[]>
}

const ProgramSwitcher = ({ getPrograms }: Props) => {
  const params = useParams()
  const router = useRouter()
  const programId = params.programId
  const { isMobile } = useSidebar()
  const { data, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  })
  const activeProgram = data?.find((program) => program.id === programId)

  const onSelectProgram = (program: Program) => {
    router.push(`/${program.id}/schedule`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            {activeProgram ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeProgram.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>) :
              (
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {"Select Program"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Programs
            </DropdownMenuLabel>
            {data?.map((program) => (
              <DropdownMenuItem
                key={program.name}
                onClick={() => onSelectProgram(program)}
                className="gap-2 p-2"
              >
                {program.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <NewProgramDialog>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add Program</div>
              </DropdownMenuItem>
            </NewProgramDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default ProgramSwitcher