import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Agent",
  description: "Created by Team 9x3",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>{children}</>
  );
}
