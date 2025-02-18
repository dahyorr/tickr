// import { cookies } from "next/headers"
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar";

export async function BaseLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Navbar />
      <div className="flex ">
        <SidebarProvider defaultOpen={true} className="pt-(--header-height) flex flex-col">
          <div className="flex flex-1">
            <AppSidebar />
            {/* <SidebarInset> */}
              <main className="flex bg-red-500 flex-1 w-[calc(100%-var(--sidebar-width))]">
                {children}
              </main>
            {/* </SidebarInset> */}
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}


export default BaseLayout
