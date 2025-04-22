
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Role } from "@/api/cerberusApi";
import { CheckIcon, XIcon } from "lucide-react";

interface AccessPolicyInfoProps {
  selectedRole: Role;
}

export const AccessPolicyInfo = ({ selectedRole }: AccessPolicyInfoProps) => {
  // Policy information - this should match the rules in cerberusApi.ts
  const policyInfo = {
    student: {
      standardBook: true,
      restrictedSection: false,
      cursedScroll: false,
    },
    prefect: {
      standardBook: true,
      restrictedSection: true,
      cursedScroll: false,
    },
    teacher: {
      standardBook: true,
      restrictedSection: true,
      cursedScroll: true,
    },
  };

  const currentPolicy = policyInfo[selectedRole];

  const renderAccessIcon = (hasAccess: boolean) => (
    hasAccess 
      ? <CheckIcon className="h-4 w-4 text-green-600" /> 
      : <XIcon className="h-4 w-4 text-red-600" />
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Access Policy</CardTitle>
        <CardDescription>
          Current permissions for role: <span className="font-semibold capitalize">{selectedRole}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          <div className="py-2 flex items-center justify-between">
            <span>Standard Book</span>
            <div className="flex items-center gap-2">
              {renderAccessIcon(currentPolicy.standardBook)}
              <span className={currentPolicy.standardBook ? "text-green-600" : "text-red-600"}>
                {currentPolicy.standardBook ? "Allowed" : "Denied"}
              </span>
            </div>
          </div>
          <div className="py-2 flex items-center justify-between">
            <span>Restricted Section</span>
            <div className="flex items-center gap-2">
              {renderAccessIcon(currentPolicy.restrictedSection)}
              <span className={currentPolicy.restrictedSection ? "text-green-600" : "text-red-600"}>
                {currentPolicy.restrictedSection ? "Allowed" : "Denied"}
              </span>
            </div>
          </div>
          <div className="py-2 flex items-center justify-between">
            <span>Cursed Scroll</span>
            <div className="flex items-center gap-2">
              {renderAccessIcon(currentPolicy.cursedScroll)}
              <span className={currentPolicy.cursedScroll ? "text-green-600" : "text-red-600"}>
                {currentPolicy.cursedScroll ? "Allowed" : "Denied"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
