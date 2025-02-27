import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar"
import EventSwitcher from "../EventSwitcher"
import MenuOptions from "./Menu"

const AppSidebar = () => {
  return (
    <Sidebar
      collapsible={"icon"}
      variant="sidebar"
      className="top-(--delta) h-[calc(100svh-var(--delta))]! [--delta:calc(var(--header-height)+1px)]"
    >
      <SidebarHeader>
        <EventSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <MenuOptions />
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar