"use client"

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/app/company/AppSidebar";
import AgentTableSection from "@/app/company/agent/section/AgentTableSection";

export default function Agent() {
  return (

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="flex flex-col w-full  px-10 py-5">
            <AgentTableSection/>
          </div>
        </main>
      </SidebarProvider>
  );
}
