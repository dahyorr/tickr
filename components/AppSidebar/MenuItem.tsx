"use client"
import { FC } from "react"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"

interface Props {
  item: {
    title: string
    url: string
    icon: FC
  }
}
const MenuItem = ({ item }: Props) => {
  const pathname = usePathname()
  const { programId } = useParams()
  const url = `/${programId}${item.url}`
  return (
    <SidebarMenuItem >
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link href={url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
export default MenuItem