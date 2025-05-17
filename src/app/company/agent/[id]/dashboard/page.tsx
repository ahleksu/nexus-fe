/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/company/AppSidebar";
import { AgentKpiDashboard } from "@/app/company/agent/component/AgentKpiDashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { agentData } from "../../data/agentData";

// Replace this with your real data fetching logic
const mockAgents = [
  { id: "1", name: "Alex Johnson", email: "alex.johnson@email.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@email.com" },
];

export default function AgentDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params); // <-- Unwrap the params Promise

  const agent = agentData.find((a) => a.id === id);

  if (!agent) {
    return <div className="p-4">Agent not found.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex flex-col w-full px-10 py-5">
          <AgentKpiDashboard
            agent={agent}
            onBack={() => router.push("/company/agent")}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}
