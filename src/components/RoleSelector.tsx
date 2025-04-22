
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/api/cerberusApi";
import { MagicalBadge } from "./MagicalBadge";

interface RoleSelectorProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
}

export const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Hogwarts Role
      </label>
      <Select value={selectedRole} onValueChange={(value) => onRoleChange(value as Role)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="prefect">Prefect</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-4 flex justify-center">
        <MagicalBadge role={selectedRole} />
      </div>
      <div className="mt-3 text-sm text-muted-foreground">
        {selectedRole === "student" && (
          <p>As a student, you can only access standard textbooks.</p>
        )}
        {selectedRole === "prefect" && (
          <p>As a prefect, you can access standard books and the restricted section with permission.</p>
        )}
        {selectedRole === "teacher" && (
          <p>As a teacher, you have full access to all resources including dangerous artifacts.</p>
        )}
      </div>
    </div>
  );
};
