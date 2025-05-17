"use client"

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/app/company/AppSidebar";
import DocumentTableSection from "@/app/company/document/section/DocumentTableSection";

export default function DocumentPage() {
  return (

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
            <div className="flex flex-col w-full px-10 py-5">
                <DocumentTableSection/>
             </div>
        </main>
      </SidebarProvider>

  );
}
