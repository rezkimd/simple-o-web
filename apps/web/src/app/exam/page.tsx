"use client";

import Link from "next/link"; // MODIFIKASI: Menggunakan Link dari Next.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";
// MODIFIKASI: Siapkan untuk data fetching di masa depan
// import { trpc } from "@/utils/trpc";
// import Loader from "@/components/loader";

interface Exam {
  id: string;
  title: string;
  classTitle: string;
  date: string;
  duration: string;
  questions: number;
  status: "upcoming" | "completed" | "missed";
  score?: number;
}

export default function ExamListPage() {
  // MODIFIKASI: Data fetching menggunakan tRPC akan menggantikan mock data ini
  // const { data: exams, isLoading } = trpc.exams.getAll.useQuery();
  // if (isLoading) return <Loader />;

  // --- MOCK DATA (Gantilah dengan data dari tRPC di atas saat backend siap) ---
  const exams: Exam[] = [
    { id: "1", title: "Midterm Assessment", classTitle: "Web Development Fundamentals", date: "2025-10-20", duration: "90 minutes", questions: 20, status: "upcoming" },
    { id: "2", title: "Final Exam", classTitle: "Digital Marketing Strategy", date: "2025-10-25", duration: "120 minutes", questions: 30, status: "upcoming" },
    { id: "3", title: "Python Fundamentals Quiz", classTitle: "Data Science with Python", date: "2025-09-15", duration: "60 minutes", questions: 15, status: "completed", score: 92 },
    { id: "4", title: "HTML & CSS Assessment", classTitle: "Web Development Fundamentals", date: "2025-08-10", duration: "75 minutes", questions: 18, status: "completed", score: 88 },
  ];
  // --- AKHIR MOCK DATA ---

  const upcomingExams = (exams || []).filter((exam) => exam.status === "upcoming");
  const completedExams = (exams || []).filter((exam) => exam.status === "completed");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming": return <Badge variant="default">Upcoming</Badge>;
      case "completed": return <Badge variant="secondary">Completed</Badge>;
      case "missed": return <Badge variant="destructive">Missed</Badge>;
      default: return null;
    }
  };
  
  // Fungsi ini menggunakan new Date(), jadi komponen ini harus client component
  const isExamSoon = (dateStr: string) => {
    const examDate = new Date(dateStr);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Exams</h1>
          <p className="text-muted-foreground">View and manage your course assessments</p>
        </div>

        {/* Upcoming Exams */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className={`shadow-[var(--shadow-md)] ${isExamSoon(exam.date) ? "border-accent border-2" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      {getStatusBadge(exam.status)}
                      {isExamSoon(exam.date) && (
                        <Badge variant="outline" className="ml-2 bg-accent/10 text-accent border-accent">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">{exam.title}</CardTitle>
                  <CardDescription>{exam.classTitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" /><span>{new Date(exam.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span></div>
                    <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>{exam.duration}</span></div>
                    <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-muted-foreground" /><span>{exam.questions} questions</span></div>
                  </div>
                  <div className="flex gap-2">
                    {/* MODIFIKASI: Menggunakan Link Next.js dan path yang benar */}
                    <Button asChild variant="accent" className="flex-1">
                      <Link href={{pathname: "/exams/${exam.id}"}}>Start Exam</Link>
                    </Button>
                    <Button asChild variant="outline">
                      {/* MODIFIKASI: Menggunakan Link Next.js dan path yang benar */}
                      <Link href={{pathname: "/exams/${exam.id}"}}>Study</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {upcomingExams.length === 0 && (
            <Card className="shadow-[var(--shadow-md)]">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No upcoming exams</h3>
                <p className="text-muted-foreground">You're all caught up! Check back later for new assessments.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Completed Exams */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Completed Exams</h2>
          <div className="space-y-4">
            {completedExams.map((exam) => (
              <Card key={exam.id} className="shadow-[var(--shadow-md)]">
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(exam.status)}
                        {exam.score && (
                          <Badge variant="outline" className={exam.score >= 90 ? "bg-green-500/10 text-green-500 border-green-500" : exam.score >= 70 ? "bg-accent/10 text-accent border-accent" : "bg-destructive/10 text-destructive border-destructive"}>
                            Score: {exam.score}%
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{exam.title}</h3>
                      <p className="text-sm text-muted-foreground">{exam.classTitle}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(exam.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{exam.questions} questions</span>
                      </div>
                    </div>
                    <Button variant="outline">View Results</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}