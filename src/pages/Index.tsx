
import React, { useState } from "react";
import { CerberusHeader } from "@/components/CerberusHeader";
import { RoleSelector } from "@/components/RoleSelector";
import { ContextInput } from "@/components/ContextInput";
import { ToolCard } from "@/components/ToolCard";
import { AccessPolicyInfo } from "@/components/AccessPolicyInfo";
import { CerberusExplanation } from "@/components/CerberusExplanation";
import { HogwartsFooter } from "@/components/HogwartsFooter";
import { AccessController } from "@/components/AccessController";
import { cerberusApi, BorrowResponse, Role, Tool } from "@/api/cerberusApi";

const Index = () => {
  const [role, setRole] = useState<Role>("student");
  const [context, setContext] = useState("");

  const handleAccessAttempt = async (toolId: Tool): Promise<BorrowResponse> => {
    return await cerberusApi.borrowTool({
      role,
      context,
      tool: toolId,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <CerberusHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Controls</h2>
              <AccessController role={role} />
              <RoleSelector selectedRole={role} onRoleChange={setRole} />
              <ContextInput context={context} onContextChange={setContext} />
              <AccessPolicyInfo selectedRole={role} />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <ToolCard
                toolId="standardBook"
                title="Standard Book"
                description="Common textbooks available to all Hogwarts students."
                onAccessAttempt={handleAccessAttempt}
              />
              <ToolCard
                toolId="restrictedSection"
                title="Restricted Section"
                description="Books containing advanced and potentially dangerous magic."
                onAccessAttempt={handleAccessAttempt}
              />
              <ToolCard
                toolId="cursedScroll"
                title="Cursed Scroll"
                description="Ancient artifacts with powerful dark magic. Highly dangerous."
                onAccessAttempt={handleAccessAttempt}
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <CerberusExplanation />
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p className="mb-2">Cerberus Access Control Demonstration</p>
          <p>A metadata-driven gatekeeping system for agent tools</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
