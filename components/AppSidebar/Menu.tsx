"use client"
import { SidebarMenu } from "../ui/sidebar"
import { Calendar, Monitor, Settings } from "lucide-react"
import MenuItem from "./MenuItem"

const programItems = [
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
const MenuOptions = () => {
  return (
    <SidebarMenu>
    {programItems.map(item => (
      <MenuItem item={item} key={item.title} />
    ))}
  </SidebarMenu>
  )
}
export default MenuOptions