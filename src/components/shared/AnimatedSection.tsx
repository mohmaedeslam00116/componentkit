"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

export function AnimatedSection({ children, className, delay }: AnimatedSectionProps) {
  const { ref, inView } = useInView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        delay,
        mounted && !inView && "opacity-0 translate-y-8",
        mounted && inView && "opacity-100 translate-y-0",
        !mounted && "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
