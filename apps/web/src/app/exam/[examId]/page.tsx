"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // MODIFIKASI: Menggunakan router dari Next.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner"; // MODIFIKASI: Menggunakan sonner
// MODIFIKASI: Siapkan untuk tRPC dan Loader
// import { trpc } from "@/utils/trpc";
// import Loader from "@/components/loader";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
}

// MODIFIKASI: Komponen menerima `params` dari Next.js
export default function ExamInterfacePage({ params }: { params: { examId: string } }) {
  const { examId } = params; // MODIFIKASI: Mengambil ID dari params
  const router = useRouter();

  // MODIFIKASI: Data fetching menggunakan tRPC akan menggantikan mock data ini
  // const { data: examData, isLoading } = trpc.exams.getById.useQuery({ id: examId });
  // if (isLoading) return <Loader />;
  // if (!examData) return <div>Exam not found.</div>;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({}); // MODIFIKASI: Key adalah ID pertanyaan (string)
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 menit
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- MOCK DATA (Gantilah dengan data dari tRPC di atas) ---
  const examData = {
    id: examId,
    title: "Midterm Assessment",
    classTitle: "Web Development Fundamentals",
    duration: "90 minutes",
    questions: [
      { id: "q1", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
      { id: "q2", question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "color", "font-color", "text-style"], correctAnswer: 1 },
      { id: "q3", question: "What is the correct JavaScript syntax to change the content of an HTML element?", options: ['document.getElementById("demo").innerHTML = "Hello"', 'document.getElementByName("demo").innerHTML = "Hello"', 'document.getElement("demo").innerHTML = "Hello"', '#demo.innerHTML = "Hello"'], correctAnswer: 0 },
      { id: "q4", question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<css>", "<script>", "<styles>"], correctAnswer: 0 },
      { id: "q5", question: "What is the correct way to write a JavaScript array?", options: ['var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'], correctAnswer: 1 },
    ],
  };
  const { questions } = examData;
  // --- AKHIR MOCK DATA ---

  // MODIFIKASI: Siapkan tRPC mutation untuk submit
  // const submitExamMutation = trpc.exams.submit.useMutation({
  //   onSuccess: (result) => {
  //     // 'result' akan berisi score dari backend
  //     toast.success("Exam Submitted!", { description: `Your answers have been recorded.` });
  //     setIsSubmitted(true);
  //   },
  //   onError: (error) => {
  //     toast.error("Submission Failed", { description: error.message });
  //   }
  // });

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    // MODIFIKASI: Panggil tRPC mutation di sini
    // submitExamMutation.mutate({ examId, answers });

    // --- SIMULASI (Hapus jika sudah menggunakan tRPC) ---
    toast.success("Exam Submitted", { description: "Your answers have been recorded successfully." });
    setIsSubmitted(true);
    // --- AKHIR SIMULASI ---
  };

  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / questions.length) * 100;
  
  if (isSubmitted) {
    // Tampilan hasil bisa dibuat lebih dinamis dengan data dari `submitExamMutation.data`
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-[var(--shadow-lg)]">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center"><div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center"><CheckCircle className="h-8 w-8 text-green-500" /></div></div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Exam Submitted!</h3>
              <p className="text-muted-foreground">Your results are now available on the dashboard.</p>
              <Button onClick={() => router.push("/dashboard")} className="mt-4">Back to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-4xl mx-auto space-y-6">
        {/* Exam Header */}
        <Card className="shadow-[var(--shadow-md)]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{examData.title}</CardTitle>
                <CardDescription>{examData.classTitle}</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className={`h-5 w-5 ${timeRemaining < 600 ? "text-destructive" : "text-accent"}`} />
                <span className={timeRemaining < 600 ? "text-destructive" : ""}>{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Progress</span><span className="font-medium">{answeredQuestions} of {questions.length} answered</span></div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="shadow-[var(--shadow-lg)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Question {currentQuestion + 1} of {questions.length}</CardTitle>
              {!answers[questions[currentQuestion].id] && <div className="flex items-center gap-2 text-sm text-muted-foreground"><AlertCircle className="h-4 w-4" />Not answered</div>}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{questions[currentQuestion].question}</p>
            <RadioGroup value={answers[questions[currentQuestion].id] || ""} onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)} className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={`q${questions[currentQuestion].id}-o${index}`} />
                  <Label htmlFor={`q${questions[currentQuestion].id}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentQuestion(p => p - 1)} disabled={currentQuestion === 0}>Previous</Button>
              <div className="flex gap-2">
                {currentQuestion < questions.length - 1 ? (
                  <Button variant="accent" onClick={() => setCurrentQuestion(p => p + 1)}>Next Question</Button>
                ) : (
                  <Button variant="accent" onClick={handleSubmit}>Submit Exam</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <Card className="shadow-[var(--shadow-md)]">
          <CardHeader><CardTitle className="text-lg">Question Navigator</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, index) => (
                <Button key={q.id} variant={currentQuestion === index ? "accent" : answers[q.id] ? "secondary" : "outline"} size="sm" onClick={() => setCurrentQuestion(index)} className="w-full">{index + 1}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}