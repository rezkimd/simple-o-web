"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // MODIFIKASI: Menggunakan router dari Next.js
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { toast } from "sonner"; // MODIFIKASI: Menggunakan 'sonner' untuk notifikasi
import { authClient } from "@/lib/auth-client"; // MODIFIKASI: Menggunakan auth client dari simple-o-web

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // MODIFIKASI: Logika sign-in disesuaikan dengan authClient
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Welcome back!", {
            description: "You've successfully signed in.",
          });
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Sign In Failed", {
            description: error.error.message || "Please check your credentials and try again.",
          });
          setIsLoading(false);
        },
      }
    );
  };

  // MODIFIKASI: Logika sign-up disesuaikan dengan authClient
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signUp.email(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Account created!", {
            description: "Welcome to LearnHub.",
          });
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Sign Up Failed", {
            description: error.error.message || "An error occurred. Please try again.",
          });
          setIsLoading(false);
        },
      }
    );
  };

  // UI dari Nova Class dipertahankan karena sudah kompatibel
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">LearnHub</span>
          </div>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" name="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full" variant="accent" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to start your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" name="name" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full" variant="accent" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}