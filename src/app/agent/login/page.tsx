"use client";

import { Brain, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Card className="border-border/40 bg-card/95 shadow-xl backdrop-blur-sm">
      <CardHeader className="space-y-6 pb-8 text-center">
        <div className="mx-auto flex justify-center">
          {/* Logo container with glow effect */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-inner">
            <Brain className="w-12 h-12 text-primary" />
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-md"></div>
          </div>
        </div>

        <div className="space-y-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight">
            NEXUS Agent Portal
            <Sparkles className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to access the unified AI platform
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Button
                variant="link"
                className="h-auto p-0 text-xs font-normal text-muted-foreground"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 bg-background/50"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-primary/30 bg-background/50 text-primary focus:ring-primary/30"
              />
            </div>
            <Label
              htmlFor="remember"
              className="text-sm font-normal text-muted-foreground"
            >
              Remember me for 30 days
            </Label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-6">
        <Button
          className="h-11 w-full text-sm font-medium"
          onClick={() => console.log("Login button clicked - UI only")}
        >
          Sign in
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} NEXUS. All rights reserved.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
