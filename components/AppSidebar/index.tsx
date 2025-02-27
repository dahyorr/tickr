import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar"
import MenuOptions from "./Menu"
import { getEvents } from "@/server/events"
import EventSwitcher from "../EventSwitcher"

const AppSidebar = () => {

  return (
    <Sidebar
      collapsible={"icon"}
      variant="sidebar"
      className="top-(--delta) h-[calc(100svh-var(--delta))]! [--delta:calc(var(--header-height)+1px)]"
    >
      <SidebarHeader>
        <EventSwitcher getEvents={getEvents} />
      </SidebarHeader>
      <SidebarContent>
        <MenuOptions />
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar