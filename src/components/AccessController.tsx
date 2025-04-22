
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/api/cerberusApi";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

interface AccessControllerProps {
  role: Role;
}

export const AccessController = ({ role }: AccessControllerProps) => {
  const roleInfo = {
    student: {
      icon: <Shield className="h-6 w-6 text-yellow-600" />,
      label: "Student Access Level",
      description: "Basic access to standard books only"
    },
    prefect: {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      label: "Prefect Access Level",
      description: "Intermediate access includes restricted section"
    },
    teacher: {
      icon: <ShieldAlert className="h-6 w-6 text-purple-700" />,
      label: "Teacher Access Level",
      description: "Full access to all resources including dangerous artifacts"
    }
  };

  const info = roleInfo[role];

  return (
    <div className="bg-white rounded-md p-4 border border-amber-100 mb-6">
      <div className="flex items-center space-x-3 mb-2">
        {info.icon}
        <div>
          <h3 className="font-semibold">{info.label}</h3>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Badge variant="outline" className="capitalize">{role}</Badge>
        <span className="text-xs text-muted-foreground">
          Security Level: {role === "student" ? "1" : role === "prefect" ? "2" : "3"}
        </span>
      </div>
    </div>
  );
};
