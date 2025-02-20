"use client"
import { Calendar, Monitor, Settings } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import EventSwitcher from "./EventSwitcher"

const eventItems = [
  {
    title: "Schedule",
    url: "/schedule",
    icon: Calendar
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Monitor
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }
]

const events = [
  {
    name: "Acme Inc",
  },
  {
    name: "Acme Corp.",
  },
  {
    name: "Evil Corp.",
  },
]

const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible={"icon"}
      variant="sidebar"
      className="top-(--delta) h-[calc(100svh-var(--delta))]! [--delta:calc(var(--header-height)+1px)]"
    >
      <SidebarHeader>
        <EventSwitcher events={events} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {eventItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar