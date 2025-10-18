"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
}

type ExamInterfaceProps = {
  examId: string;
  user?: { name: string; email: string } | null;
  onUnauthorized?: () => void;
  onSubmit: (score: number, totalQuestions: number) => void;
  onBack?: () => void;
  showToast?: (toast: { title: string; description: string }) => void;
};

export default function ExamInterface({ 
  examId, 
  user: propUser, 
  onUnauthorized, 
  onSubmit, 
  onBack,
  showToast 
}: ExamInterfaceProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(propUser || null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!propUser) {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        onUnauthorized?.();
        return;
      }
      setUser(JSON.parse(savedUser));
    }
  }, [propUser, onUnauthorized]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock exam data
  const examData = {
    id: examId,
    title: "Midterm Assessment",
    classTitle: "Web Development Fundamentals",
    duration: "90 minutes",
  };

  const questions: Question[] = [
    {
      id: "1",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      id: "2",
      question: "Which CSS property is used to change the text color?",
      options: ["font-color", "text-color", "color", "text-style"],
      correctAnswer: 2,
    },
    {
      id: "3",
      question: "What is the correct JavaScript syntax to print 'Hello World' in the console?",
      options: [
        "print('Hello World')",
        "console.log('Hello World')",
        "echo('Hello World')",
        "System.out.println('Hello World')",
      ],
      correctAnswer: 1,
    },
    {
      id: "4",
      question: "Which HTML tag is used to define an internal style sheet?",
      options: ["<style>", "<css>", "<script>", "<stylesheet>"],
      correctAnswer: 0,
    },
    {
      id: "5",
      question: "What is the correct way to declare a variable in JavaScript ES6?",
      options: ["var x = 5;", "let x = 5;", "const x = 5;", "All of the above"],
      correctAnswer: 3,
    },
  ];

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setIsSubmitted(true);
    
    if (showToast) {
      showToast({
        title: "Exam Submitted",
        description: `You scored ${correctCount} out of ${questions.length}`,
      });
    }
    
    onSubmit(correctCount, questions.length);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (Object.keys(answers).length / questions.length) * 100;
  const isLowTime = timeRemaining < 600; // Less than 10 minutes

  if (!user) {
    return null;
  }

  if (isSubmitted) {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="container max-w-4xl mx-auto">
          <Card className="shadow-[var(--shadow-lg)]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-accent" />
              </div>
              <CardTitle className="text-3xl">Exam Submitted!</CardTitle>
              <CardDescription>Your answers have been recorded</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">
                  {score}/{questions.length}
                </p>
                <p className="text-muted-foreground">Correct Answers</p>
                <p className="text-2xl font-semibold mt-4">
                  {Math.round((score / questions.length) * 100)}%
                </p>
              </div>

              <div className="flex gap-4">
                {onBack && (
                  <Button variant="outline" onClick={onBack} className="flex-1">
                    Back to Class
                  </Button>
                )}
                <Button variant="accent" onClick={() => window.location.reload()} className="flex-1">
                  Review Answers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-4xl mx-auto space-y-6">
        {/* Exam Header */}
        <Card className="shadow-[var(--shadow-lg)]">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">{examData.title}</CardTitle>
                <CardDescription>{examData.classTitle}</CardDescription>
              </div>
              <Badge
                variant={isLowTime ? "destructive" : "default"}
                className="flex items-center gap-2 text-lg px-4 py-2"
              >
                <Clock className="h-5 w-5" />
                {formatTime(timeRemaining)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {Object.keys(answers).length}/{questions.length} answered
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {isLowTime && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">Less than 10 minutes remaining!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="shadow-[var(--shadow-md)]">
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1} of {questions.length}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground mt-2">
                  {question.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                >
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                        <Label
                          htmlFor={`q${question.id}-${optionIndex}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <Card className="shadow-[var(--shadow-md)] sticky bottom-4">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  Save & Exit
                </Button>
              )}
              <Button
                variant="accent"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className="flex-1"
              >
                Submit Exam ({Object.keys(answers).length}/{questions.length} answered)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
