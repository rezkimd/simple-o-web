"use client";

import Link from "next/link"; // MODIFIKASI: Menggunakan Link dari Next.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, CheckCircle, Lock, Calendar, Clock, Award } from "lucide-react";
// MODIFIKASI: tRPC dan Loader untuk data fetching
// import { trpc } from "@/utils/trpc";
// import Loader from "@/components/loader";

// Tipe data ini bisa dipindahkan ke file terpisah
interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

// MODIFIKASI: Komponen sekarang menerima `params` dari Next.js App Router
export default function ClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params; // MODIFIKASI: Mengambil ID dari params, bukan useParams()

  // MODIFIKASI: Data fetching menggunakan tRPC akan menggantikan mock data ini
  // const { data: classData, isLoading } = trpc.classes.getById.useQuery({ id: classId });
  // if (isLoading) return <Loader />;
  // if (!classData) return <div>Class not found.</div>;

  // --- MOCK DATA (Gantilah dengan data dari tRPC di atas saat backend siap) ---
  const classData = {
    id: classId,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    description: "Learn the core concepts of modern web development including HTML, CSS, and JavaScript. Build real-world projects and master the fundamentals.",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    duration: "12 weeks",
    level: "Beginner",
  };

  const lessons: Lesson[] = [
    { id: "1", title: "Introduction to Web Development", duration: "15 min", completed: true, locked: false },
    { id: "2", title: "HTML Basics", duration: "30 min", completed: true, locked: false },
    { id: "3", title: "CSS Fundamentals", duration: "45 min", completed: true, locked: false },
    { id: "4", title: "JavaScript Basics", duration: "60 min", completed: true, locked: false },
    { id: "5", title: "DOM Manipulation", duration: "50 min", completed: false, locked: false },
    { id: "6", title: "JavaScript ES6 Features", duration: "55 min", completed: false, locked: false },
    { id: "7", title: "Async Programming", duration: "40 min", completed: false, locked: true },
    { id: "8", title: "Working with APIs", duration: "45 min", completed: false, locked: true },
  ];

  const upcomingExam = {
    id: "1",
    title: "Midterm Assessment",
    date: "2025-10-20",
    duration: "90 minutes",
    topics: "HTML, CSS, JavaScript Basics",
  };
  // --- AKHIR MOCK DATA ---

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Class Header */}
        <Card className="shadow-[var(--shadow-lg)]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{classData.level}</Badge>
                  <Badge variant="outline">{classData.duration}</Badge>
                </div>
                <CardTitle className="text-3xl">{classData.title}</CardTitle>
                <CardDescription className="text-base">Instructor: {classData.instructor}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{classData.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">
                  {classData.completedLessons} of {classData.totalLessons} lessons completed
                </span>
              </div>
              <Progress value={classData.progress} className="h-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <PlayCircle className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Lessons</p>
                  <p className="font-semibold">{classData.totalLessons}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{classData.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Certificate</p>
                  <p className="font-semibold">Included</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
                <CardDescription>Complete lessons in order to unlock the next ones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${lesson.locked ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {lesson.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : lesson.locked ? <Lock className="h-5 w-5" /> : <PlayCircle className="h-5 w-5 text-accent" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{index + 1}. {lesson.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duration}</p>
                      </div>
                    </div>
                    {!lesson.locked && <Button size="sm" variant={lesson.completed ? "outline" : "accent"}>{lesson.completed ? "Review" : "Start"}</Button>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Exam */}
          <div>
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>Upcoming Exam</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-accent/5 space-y-3">
                  <h4 className="font-semibold">{upcomingExam.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{new Date(upcomingExam.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{upcomingExam.duration}</div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-1">Topics Covered:</p>
                    <p className="text-sm text-muted-foreground">{upcomingExam.topics}</p>
                  </div>
                  {/* MODIFIKASI: Menggunakan Link Next.js dan path yang benar */}
                  <Button asChild className="w-full mt-2" variant="accent">
                    <Link href={{pathname:"/exams/${upcomingExam.id}"}}>View Exam Details</Link>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <h5 className="font-medium">Need Help?</h5>
                  <p className="text-sm text-muted-foreground">Review completed lessons and check out the study materials before taking the exam.</p>
                  <Button variant="outline" size="sm" className="w-full">Download Study Guide</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}