
import React from "react";
import { cn } from "@/lib/utils";

interface MagicalBadgeProps {
  role: "student" | "prefect" | "teacher";
  className?: string;
}

export const MagicalBadge = ({ role, className }: MagicalBadgeProps) => {
  const badgeStyles = {
    student: "bg-yellow-100 text-yellow-800 border-yellow-300",
    prefect: "bg-blue-100 text-blue-800 border-blue-300",
    teacher: "bg-purple-100 text-purple-800 border-purple-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full border",
        badgeStyles[role],
        className
      )}
    >
      <span className="mr-1">✦</span>
      <span className="capitalize">{role}</span>
    </span>
  );
};
