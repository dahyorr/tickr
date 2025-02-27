// import { cookies } from "next/headers"
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"

export async function BaseLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (

    <div className="flex ">
      <SidebarProvider defaultOpen={true} className="pt-(--header-height) flex flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          {/* <SidebarInset> */}
          <main className="flex flex-1">
            {children}
          </main>

        </div>
      </SidebarProvider>
    </div>
  )
}


export default BaseLayout
