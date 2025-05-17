"use client"

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/app/company/AppSidebar";

export default function Agent() {
  return (

      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <div className="flex flex-col container m-auto ">
            <h1>Test</h1>
          </div>
        </main>
      </SidebarProvider>

  );
}
