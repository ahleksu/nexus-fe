/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import Agent from "@/app/company/agent/page";

export const metadata: Metadata = {
  title: "Nexus Agent",
  description: "Created by Team 9x3",
};

export default function AgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>{children}</>
  );
}
