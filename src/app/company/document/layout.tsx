
import type { Metadata } from "next";
import Agent from "@/app/company/agent/page";

export const metadata: Metadata = {
  title: "Nexus Document",
  description: "Created by Team 9x3",
};

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>{children}</>
  );
}
