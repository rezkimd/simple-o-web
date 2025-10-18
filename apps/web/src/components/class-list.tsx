"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Users, Star } from "lucide-react";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  enrolled: boolean;
}

type ClassListProps = {
  onNavigateToClass: (classId: string) => void;
};

export default function ClassList({ onNavigateToClass }: ClassListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const courses: Course[] = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      instructor: "Sarah Johnson",
      description: "Learn HTML, CSS, and JavaScript from scratch. Build real-world projects.",
      level: "Beginner",
      duration: "12 weeks",
      students: 2543,
      rating: 4.8,
      enrolled: true,
    },
    {
      id: "2",
      title: "Data Science with Python",
      instructor: "Dr. Michael Chen",
      description: "Master data analysis, visualization, and machine learning with Python.",
      level: "Intermediate",
      duration: "16 weeks",
      students: 1876,
      rating: 4.9,
      enrolled: true,
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      instructor: "Emily Rodriguez",
      description: "Comprehensive guide to modern digital marketing and social media.",
      level: "Beginner",
      duration: "8 weeks",
      students: 3210,
      rating: 4.7,
      enrolled: true,
    },
    {
      id: "4",
      title: "Mobile App Development",
      instructor: "Alex Turner",
      description: "Build native mobile apps for iOS and Android using React Native.",
      level: "Intermediate",
      duration: "14 weeks",
      students: 1543,
      rating: 4.6,
      enrolled: false,
    },
    {
      id: "5",
      title: "UI/UX Design Masterclass",
      instructor: "Jessica Lee",
      description: "Learn user interface and experience design principles and tools.",
      level: "Beginner",
      duration: "10 weeks",
      students: 2890,
      rating: 4.8,
      enrolled: false,
    },
    {
      id: "6",
      title: "Cloud Computing with AWS",
      instructor: "Robert Martinez",
      description: "Master Amazon Web Services and cloud architecture fundamentals.",
      level: "Advanced",
      duration: "12 weeks",
      students: 987,
      rating: 4.9,
      enrolled: false,
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Classes</h1>
          <p className="text-muted-foreground">Explore our comprehensive course catalog</p>
        </div>

        {/* Search */}
        <Card className="shadow-[var(--shadow-md)]">
          <CardContent className="pt-6">
            <Input
              placeholder="Search courses by title, instructor, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-2xl"
            />
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all flex flex-col"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={course.level === "Beginner" ? "secondary" : course.level === "Intermediate" ? "default" : "outline"}>
                    {course.level}
                  </Badge>
                  {course.enrolled && (
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                      Enrolled
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {course.rating} rating
                    </div>
                  </div>

                  <Button
                    variant={course.enrolled ? "accent" : "outline"}
                    className="w-full"
                    onClick={() => onNavigateToClass(course.id)}
                  >
                    {course.enrolled ? "Continue Learning" : "View Details"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="shadow-[var(--shadow-md)]">
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search term to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
