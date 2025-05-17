"use client"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/app/company/AppSidebar";
import CallTableSection from "@/app/company/call_session/section/CallTableSection";

export default function CallSessionPage() {
  return (

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
            <div className="flex flex-col w-full px-10 py-5">
                <CallTableSection/>
            </div>
        </main>
      </SidebarProvider>

  );
}
