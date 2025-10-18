// File: apps/web/src/components/loader.tsx

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Utilitas untuk menggabungkan class CSS

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("flex h-full items-center justify-center py-20", className)}>
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}