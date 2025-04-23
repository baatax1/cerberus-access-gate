
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
import { StudentBadge360 } from "@/components/StudentBadge360";
import { AIChat } from "@/components/AIChat";

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section - completely above everything else */}
        <CerberusHeader />
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left sidebar with access policy and tool cards */}
          <aside className="w-full md:w-1/3 flex flex-col gap-4">
            {/* Profile badge at top of sidebar on mobile, hidden on desktop */}
            <div className="md:hidden mb-2">
              <StudentBadge360
                metadata={{
                  access_level: "special_permission",
                  approved_books: ["all_standard_texts", "advanced_magical_theory"],
                  house: "Slytherin",
                  name: "Tom Riddle",
                  prefect: true,
                  restricted_books: [
                    "secrets_of_the_darkest_art",
                    "moste_potente_potions",
                    "magick_moste_evile",
                  ],
                  special_permission: {
                    expiry: "end_of_term",
                    granted_by: "Professor Slughorn",
                    purpose: "academic_research",
                  },
                  wand_core: "phoenix_feather",
                  year: 7,
                }}
              />
            </div>
            <AccessPolicyInfo selectedRole={role} />
            <div className="flex flex-col gap-3">
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
          </aside>
          
          {/* Main content area */}
          <main className="flex-1 flex flex-col gap-6 items-stretch">
            {/* Profile badge at top of main content area, only visible on desktop */}
            <div className="hidden md:block">
              <StudentBadge360
                metadata={{
                  access_level: "special_permission",
                  approved_books: ["all_standard_texts", "advanced_magical_theory"],
                  house: "Slytherin",
                  name: "Tom Riddle",
                  prefect: true,
                  restricted_books: [
                    "secrets_of_the_darkest_art",
                    "moste_potente_potions",
                    "magick_moste_evile",
                  ],
                  special_permission: {
                    expiry: "end_of_term",
                    granted_by: "Professor Slughorn",
                    purpose: "academic_research",
                  },
                  wand_core: "phoenix_feather",
                  year: 7,
                }}
              />
            </div>
            {/* AI Chat as focal point */}
            <div className="flex-1 flex flex-col justify-center">
              <AIChat />
            </div>
          </main>
        </div>
        
        {/* Controls section */}
        <section className="max-w-lg mx-auto mt-10 bg-white/80 shadow rounded-xl p-6 flex flex-col gap-4 border">
          <h2 className="text-lg font-bold mb-2 text-gray-700">Manual Controls</h2>
          <AccessController role={role} />
          <RoleSelector selectedRole={role} onRoleChange={setRole} />
          <ContextInput context={context} onContextChange={setContext} />
        </section>
        
        <div className="mt-12">
          <CerberusExplanation />
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-12 pb-8">
          <p className="mb-2">Cerberus Access Control Demonstration</p>
          <p>A metadata-driven gatekeeping system for agent tools</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
