"use client"
import { FC } from "react"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface Props {
  item: {
    title: string
    url: string
    icon: FC
  }
}
const MenuItem = ({item}: Props) => {
  const pathname = usePathname()
  return (
    <SidebarMenuItem >
    <SidebarMenuButton asChild isActive={pathname === item.url}>
      <Link href={item.url}>
        <item.icon />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
  )
}
export default MenuItem