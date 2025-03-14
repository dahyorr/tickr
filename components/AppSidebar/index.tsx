import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar"
import MenuOptions from "./Menu"
import { getPrograms } from "@/server/programs"
import ProgramSwitcher from "../ProgramSwitcher"

const AppSidebar = () => {

  return (
    <Sidebar
      collapsible={"icon"}
      variant="sidebar"
      className="top-(--delta) h-[calc(100svh-var(--delta))]! [--delta:calc(var(--header-height)+1px)]"
    >
      <SidebarHeader>
        <ProgramSwitcher getPrograms={getPrograms} />
      </SidebarHeader>
      <SidebarContent>
        <MenuOptions />
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar