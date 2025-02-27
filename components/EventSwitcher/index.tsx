"use client"
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Event } from "@/typings"
import NewEventDialog from "../dialogs/NewEventDialog"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"

interface Props {
  getEvents: () => Promise<Event[]>
}

const EventSwitcher = ({ getEvents }: Props) => {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId
  const { isMobile } = useSidebar()
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })
  const activeEvent = data?.find((event) => event.shortId === eventId || event.id === eventId)

  const onSelectEvent = (event: Event) => {
    router.push(`/${event.shortId}/schedule`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            {activeEvent ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeEvent.name}
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
                      {"Select Event"}
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
              Events
            </DropdownMenuLabel>
            {data?.map((event) => (
              <DropdownMenuItem
                key={event.name}
                onClick={() => onSelectEvent(event)}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-xs border">
                  <event.logo className="size-4 shrink-0" />
                </div> */}
                {event.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <NewEventDialog>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add Event</div>
              </DropdownMenuItem>
            </NewEventDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default EventSwitcher