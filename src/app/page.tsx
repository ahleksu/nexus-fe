"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  FileSearch,
  Lightbulb,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation"; // <-- use this import for App Router

export default function Home() {
  const router = useRouter();

  function handleTryDemoClick() {
    router.push("/company/agent");
  }

  function handleLoginClick() {
    router.push("/agent");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">NEXUS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium hover:text-primary"
            >
              Benefits
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex cursor-pointer" onClick={handleLoginClick}>
              Log In
            </Button>
            <Button className="cursor-pointer" onClick={handleTryDemoClick}>Try Demo</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
          <div className="container mx-auto relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Supercharge Your Customer Support with Intelligent AI
                </h1>
                <p className="text-xl text-muted-foreground">
                  Our LLM-powered platform automates tasks, provides instant
                  answers, and suggests intelligent responses, allowing your
                  team to deliver exceptional customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                    Try Demo
                  </Button>
                    <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    >
                    <Link href="#why-nexus">Learn More</Link>
                    </Button>
                </div>
              </div>
              <div className="relative h-[400px] w-full rounded-lg bg-gradient-to-br from-primary/30 via-primary/20 to-background overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="NEXUS AI Platform"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section id="why-nexus" className="py-20 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Why NEXUS?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Customer support teams face numerous challenges. NEXUS provides
                the solution.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2 text-destructive">
                    The Problem
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">●</span>
                      <span>
                        Overwhelmed agents struggling with high ticket volumes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">●</span>
                      <span>
                        Slow response times leading to customer frustration
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">●</span>
                      <span>
                        Inconsistent answers causing confusion and follow-up
                        tickets
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">●</span>
                      <span>
                        Information silos making knowledge retrieval difficult
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    The Solution
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">●</span>
                      <span>
                        AI-powered assistance that reduces agent cognitive load
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">●</span>
                      <span>
                        Instant information retrieval from your knowledge base
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">●</span>
                      <span>
                        Intelligent response suggestions for faster, consistent
                        replies
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">●</span>
                      <span>
                        Unified platform that centralizes all customer support
                        needs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Key Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                NEXUS comes packed with powerful features designed to transform
                your customer support operations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileSearch className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Automated Documentation Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Agents can query your company knowledge base (FAQs, manuals)
                    using natural language to find accurate information
                    instantly.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Ticket Summarization</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automatically generate concise summaries of long customer
                    inquiries, helping agents grasp key issues in seconds.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Intelligent Response Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Receive AI-generated response suggestions based on the query
                    and relevant documentation, ensuring faster and more
                    consistent communication.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-3">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquareText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Automatically detect customer sentiment to prioritize urgent
                    issues and tailor responses appropriately, ensuring the most
                    critical matters are addressed first.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Getting started with NEXUS is simple. Our platform integrates
                seamlessly with your existing systems.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg text-center relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div className="mb-6 flex justify-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <FileSearch className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Connect Your Knowledge
                </h3>
                <p className="text-muted-foreground">
                  Easily integrate your existing documentation, FAQs, and
                  knowledge base with our platform.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg text-center relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div className="mb-6 flex justify-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Agent Asks NEXUS</h3>
                <p className="text-muted-foreground">
                  Your support team interacts with NEXUS using natural language
                  to get the information they need.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg text-center relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div className="mb-6 flex justify-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Receive Intelligent Support
                </h3>
                <p className="text-muted-foreground">
                  NEXUS provides summaries, answers, and suggestions to help
                  agents resolve issues efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Benefits
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                NEXUS delivers tangible benefits that transform your customer
                support operations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Boost Agent
                  Productivity
                </h3>
                <p className="text-muted-foreground">
                  Reduce time spent searching for information by up to 60%,
                  allowing agents to handle more tickets efficiently.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Enhance Customer
                  Satisfaction
                </h3>
                <p className="text-muted-foreground">
                  Faster, more accurate responses lead to higher customer
                  satisfaction scores and improved loyalty.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Reduce Operational
                  Costs
                </h3>
                <p className="text-muted-foreground">
                  Lower training costs and increased agent efficiency translate
                  to significant operational savings.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Ensure Consistent
                  Responses
                </h3>
                <p className="text-muted-foreground">
                  AI-powered suggestions ensure all customers receive
                  consistent, accurate information regardless of which agent
                  they interact with.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Empower Your Team
                </h3>
                <p className="text-muted-foreground">
                  Reduce agent stress and burnout by providing them with
                  powerful AI tools that make their jobs easier.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-primary">●</span> Scale Support
                  Operations
                </h3>
                <p className="text-muted-foreground">
                  Handle growing ticket volumes without proportionally
                  increasing headcount, making growth more sustainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Ready to Transform Your Customer Support?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join forward-thinking companies that are revolutionizing their
                customer service with NEXUS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto">
                  Try Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">NEXUS</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            © {new Date().getFullYear()} NEXUS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
