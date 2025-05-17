/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import Agent from "@/app/company/agent/page";

export const metadata: Metadata = {
  title: "Nexus Call Session",
  description: "Created by Team 9x3",
};

export default function CallSessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>{children}</>
  );
}
