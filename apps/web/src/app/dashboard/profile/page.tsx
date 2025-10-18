"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // MODIFIKASI: Menggunakan router dari Next.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Award, BookOpen, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client"; // MODIFIKASI: Menggunakan auth client
import { toast } from "sonner"; // MODIFIKASI: Menggunakan sonner
import { trpc } from "@/utils/trpc";
import Loader from "@/components/loader";

export default function ProfilePage() {
  const router = useRouter();
  
  // MODIFIKASI: Mengambil sesi pengguna
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // MODIFIKASI: Menggunakan tRPC mutation untuk update profil
  // const updateProfileMutation = trpc.user.updateProfile.useMutation({
  //   onSuccess: () => {
  //     toast.success("Profile Updated", { description: "Your profile has been successfully updated." });
  //     setIsEditing(false);
  //     // Invalidate query untuk refresh data jika perlu
  //   },
  //   onError: (error) => {
  //     toast.error("Update Failed", { description: error.message });
  //   }
  // });

  // MODIFIKASI: Mengisi form data saat sesi selesai dimuat
  useEffect(() => {
    if (!isSessionLoading) {
      if (!session) {
        router.replace("/login");
      } else {
        setFormData({
          name: session.user.name || "",
          email: session.user.email || "",
        });
      }
    }
  }, [session, isSessionLoading, router]);

  const handleSave = () => {
    // MODIFIKASI: Panggil tRPC mutation di sini
    // updateProfileMutation.mutate(formData);
    
    // --- SIMULASI (Hapus jika sudah menggunakan tRPC) ---
    console.log("Saving data:", formData);
    toast.success("Profile Updated", { description: "Your profile has been successfully updated." });
    setIsEditing(false);
    // Refresh halaman untuk melihat perubahan (sementara)
    router.refresh(); 
    // --- AKHIR SIMULASI ---
  };

  // --- MOCK DATA (Gantilah dengan data dinamis dari tRPC) ---
  const achievements = [
    { title: "First Course Completed", date: "March 2024", icon: BookOpen },
    { title: "Perfect Attendance", date: "April 2024", icon: Clock },
    { title: "Top Performer", date: "May 2024", icon: Award },
  ];
  const certificates = [
    { id: "1", title: "Introduction to Programming", issueDate: "2024-03-15", instructor: "Dr. John Smith" },
    { id: "2", title: "Advanced JavaScript", issueDate: "2024-05-20", instructor: "Sarah Johnson" },
  ];
  // --- AKHIR MOCK DATA ---

  if (isSessionLoading) {
    return <Loader />;
  }

  if (!session) {
    return null; // Akan diredirect oleh useEffect
  }

  const user = session.user;
  const initials = (user.name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="shadow-[var(--shadow-lg)]">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4 w-full">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} disabled /> {/* Email biasanya tidak bisa diubah */}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="accent" onClick={handleSave} disabled={false /* updateProfileMutation.isLoading */}>
                        {false /* updateProfileMutation.isLoading */ ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                      <p className="text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" />{user.email}</p>
                    </div>
                    <div className="flex gap-2"><Badge variant="secondary">Student</Badge><Badge variant="outline">Active</Badge></div>
                    <Button variant="accent" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats (data masih mock) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center"><BookOpen className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Courses Enrolled</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center"><Award className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Certificates Earned</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center"><Clock className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold">47</p><p className="text-sm text-muted-foreground">Hours Learned</p></div></div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle>Achievements</CardTitle><CardDescription>Your milestones and accomplishments</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center"><achievement.icon className="h-5 w-5 text-accent" /></div>
                  <div><p className="font-medium">{achievement.title}</p><p className="text-sm text-muted-foreground">{achievement.date}</p></div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="shadow-[var(--shadow-md)]">
            <CardHeader><CardTitle>Certificates</CardTitle><CardDescription>Your earned certifications</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 rounded-lg border space-y-2">
                  <h4 className="font-semibold">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                  <p className="text-sm text-muted-foreground">Instructor: {cert.instructor}</p>
                  <Button variant="outline" size="sm" className="w-full mt-2">Download Certificate</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}