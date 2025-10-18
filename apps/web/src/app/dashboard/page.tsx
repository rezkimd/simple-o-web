"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, TrendingUp, Calendar } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

// Tipe data bisa dipindahkan ke file terpisah nantinya
interface EnrolledClass {
  id: string;
  title: string;
  progress: number;
  nextLesson: string;
  instructor: string;
}

interface UpcomingExam {
  id: string;
  title: string;
  classTitle: string;
  date: string;
  duration: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // MODIFIKASI: Mengambil data sesi pengguna dari authClient
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  // MODIFIKASI: Redirect jika tidak ada sesi setelah selesai loading
  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.replace("/login");
    }
  }, [isSessionLoading, session, router]);

  // MODIFIKASI: Mengambil data dinamis dari backend menggunakan tRPC (contoh)
  // Anda perlu membuat endpoint ini di backend tRPC Anda
  // const { data: dashboardData, isLoading: isDataLoading } = trpc.dashboard.getData.useQuery(undefined, {
  //   enabled: !!session, // Hanya fetch data jika sesi ada
  // });

  // --- MOCK DATA (Gantilah dengan data dari tRPC di atas saat backend siap) ---
  const isDataLoading = false; // Ganti jadi true jika menggunakan tRPC
  const enrolledClasses: EnrolledClass[] = [
    { id: "1", title: "Web Development Fundamentals", progress: 65, nextLesson: "JavaScript ES6 Features", instructor: "Sarah Johnson" },
    { id: "2", title: "Data Science with Python", progress: 40, nextLesson: "Pandas DataFrames", instructor: "Dr. Michael Chen" },
    { id: "3", title: "Digital Marketing Strategy", progress: 80, nextLesson: "Social Media Analytics", instructor: "Emily Rodriguez" },
  ];
  const upcomingExams: UpcomingExam[] = [
    { id: "1", title: "Midterm Assessment", classTitle: "Web Development Fundamentals", date: "2025-10-20", duration: "90 minutes" },
    { id: "2", title: "Final Exam", classTitle: "Digital Marketing Strategy", date: "2025-10-25", duration: "120 minutes" },
  ];
  const stats = [
    { label: "Courses Enrolled", value: "3", icon: BookOpen, color: "text-blue-500" },
    { label: "Hours Learned", value: "47", icon: Clock, color: "text-green-500" },
    { label: "Certificates Earned", value: "2", icon: Award, color: "text-yellow-500" },
    { label: "Avg. Progress", value: "62%", icon: TrendingUp, color: "text-purple-500" },
  ];
  // --- AKHIR MOCK DATA ---

  // Menampilkan loader saat sesi atau data sedang dimuat
  if (isSessionLoading || isDataLoading) {
    return <Loader />;
  }
  
  // Jika setelah loading tidak ada sesi, jangan render apapun (karena akan diredirect)
  if (!session) {
    return null; 
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-[var(--shadow-md)]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Classes */}
          <div className="lg:col-span-2">
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledClasses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      {/* MODIFIKASI: Menggunakan Link Next.js */}
                      <Button asChild size="sm" variant="accent">
                        <Link href={{pathname:"/dashboard/classes/${course.id}"}}>Continue</Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Exams */}
          <div>
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Prepare for your assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <h4 className="font-semibold">{exam.title}</h4>
                    <p className="text-sm text-muted-foreground">{exam.classTitle}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {exam.duration}
                    </div>
                    {/* MODIFIKASI: Menggunakan Link Next.js */}
                    <Button asChild size="sm" variant="outline" className="w-full mt-2">
                      <Link href={{pathname:"/exams/${exam.id}"}}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}