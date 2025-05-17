import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NEXUS Agent Login",
  description: "Sign in to access the NEXUS unified AI platform for customer service",
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
      {/* Decorative elements for futuristic feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">{children}</div>
    </div>
  )
}
