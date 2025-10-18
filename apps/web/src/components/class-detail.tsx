"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  FileText,
  Calendar 
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Exam {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: "upcoming" | "completed";
}

type ClassDetailProps = {
  classId: string;
  onNavigateToExam: (examId: string) => void;
  onBack?: () => void;
};

export default function ClassDetail({ classId, onNavigateToExam, onBack }: ClassDetailProps) {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  // Mock data - in real app, this would come from props or API
  const classData = {
    id: classId,
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    description: "Learn HTML, CSS, and JavaScript from scratch. Build real-world projects and gain the skills needed for modern web development.",
    level: "Beginner",
    duration: "12 weeks",
    students: 2543,
    rating: 4.8,
    progress: 65,
    enrolled: true,
  };

  const lessons: Lesson[] = [
    { id: "1", title: "Introduction to HTML", duration: "45 min", completed: true },
    { id: "2", title: "HTML Elements and Structure", duration: "60 min", completed: true },
    { id: "3", title: "CSS Fundamentals", duration: "55 min", completed: true },
    { id: "4", title: "CSS Layouts and Flexbox", duration: "70 min", completed: true },
    { id: "5", title: "JavaScript Basics", duration: "65 min", completed: true },
    { id: "6", title: "JavaScript ES6 Features", duration: "75 min", completed: false },
    { id: "7", title: "DOM Manipulation", duration: "80 min", completed: false },
    { id: "8", title: "Async JavaScript", duration: "90 min", completed: false },
  ];

  const exams: Exam[] = [
    {
      id: "1",
      title: "Midterm Assessment",
      date: "2025-10-20",
      duration: "90 minutes",
      status: "upcoming",
    },
    {
      id: "2",
      title: "HTML & CSS Quiz",
      date: "2025-08-10",
      duration: "60 minutes",
      status: "completed",
    },
  ];

  const completedLessons = lessons.filter(l => l.completed).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            ← Back to Classes
          </Button>
        )}

        {/* Class Header */}
        <Card className="shadow-[var(--shadow-lg)]">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{classData.level}</Badge>
                  {classData.enrolled && (
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                      Enrolled
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl">{classData.title}</CardTitle>
                <CardDescription className="text-base">
                  Instructor: {classData.instructor}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="accent" size="lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{classData.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{classData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{classData.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>{classData.rating} rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{lessons.length} lessons</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium">{classData.progress}%</span>
              </div>
              <Progress value={classData.progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {lessons.length} lessons completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
                <CardDescription>Follow the curriculum at your own pace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 border rounded-lg flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer ${
                        activeLesson === lesson.id ? "bg-muted/50 border-accent" : ""
                      }`}
                      onClick={() => setActiveLesson(lesson.id)}
                    >
                      <div className="flex items-center gap-4">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {lesson.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <div className="space-y-4">
              {exams.map((exam) => (
                <Card key={exam.id} className="shadow-[var(--shadow-md)]">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={exam.status === "upcoming" ? "default" : "secondary"}>
                            {exam.status === "upcoming" ? "Upcoming" : "Completed"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{exam.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(exam.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exam.duration}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={exam.status === "upcoming" ? "accent" : "outline"}
                        onClick={() => onNavigateToExam(exam.id)}
                      >
                        {exam.status === "upcoming" ? "Start Exam" : "View Results"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Course Description</h4>
                  <p className="text-muted-foreground">
                    This comprehensive course covers the fundamentals of web development, including HTML5, CSS3, and JavaScript. 
                    You'll learn to build responsive, modern websites from scratch and understand the core concepts that power the web.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What You'll Learn</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>HTML structure and semantic elements</li>
                    <li>CSS styling, layouts, and responsive design</li>
                    <li>JavaScript programming fundamentals</li>
                    <li>DOM manipulation and event handling</li>
                    <li>Modern ES6+ features</li>
                    <li>Building real-world projects</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <p className="text-muted-foreground">
                    No prior programming experience required. Just bring your curiosity and willingness to learn!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
