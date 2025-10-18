// This is Landing Page
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Clock, CheckCircle, TrendingUp } from "lucide-react";

export default function Home() {
  // Logic dari page.tsx lama untuk memeriksa status API
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  // Data statis dari Landing.tsx
  const features = [
    {
      icon: BookOpen,
      title: "Rich Course Library",
      description: "Access hundreds of courses across multiple disciplines",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and academics",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized certificates upon completion",
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Flexible schedules that fit your lifestyle",
    },
  ];

  const stats = [
    { label: "Active Students", value: "50,000+", icon: Users },
    { label: "Available Courses", value: "500+", icon: BookOpen },
    { label: "Completion Rate", value: "94%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight">
              Transform Your Future with
              <span className="block mt-2 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Online Learning
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of students mastering new skills with our comprehensive online courses.
              Learn anytime, anywhere, at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {/* MODIFIKASI: Menggunakan <Link> dari Next.js dan prop asChild */}
              <Button asChild variant="accent" size="lg" className="text-lg px-8">
                <Link href={{ pathname: "/login" }}>Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-primary-foreground hover:bg-primary-foreground/90">
                <Link href={{ pathname: "/dashboard/classes" }}>Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center border-2 shadow-[var(--shadow-md)]">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-accent" />
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LearnHub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/90">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join our community of learners today and unlock your potential
          </p>
          {/* MODIFIKASI: Menggunakan <Link> dari Next.js dan prop asChild */}
          <Button asChild variant="accent" size="lg" className="text-lg px-8">
            <Link href="/login">Create Free Account</Link>
          </Button>
        </div>
      </section>

      {/* System Status Section */}
      <section className="py-12 px-4 border-t">
        <div className="container max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Status</span>
                  {/* MODIFIKASI: Mengintegrasikan logic healthCheck ke UI */}
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`} />
                    <span className={`text-sm font-medium ${healthCheck.data ? "text-green-500" : "text-red-500"}`}>
                      {healthCheck.isLoading
                        ? "Checking..."
                        : healthCheck.data
                          ? "Operational"
                          : "Disconnected"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Platform Health</span>
                  <span className="text-sm font-medium text-green-500">All Systems Normal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
