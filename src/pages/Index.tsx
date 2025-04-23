
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <CerberusHeader />

        {/* Profile Card at top left */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-600">Student Badge 360 Profile</h3>
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
        </section>

        {/* Access Policy Table */}
        <section className="mb-10">
          <AccessPolicyInfo selectedRole={role} />
        </section>

        {/* Controls below policy info */}
        <section className="mb-10">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Controls</h2>
            <AccessController role={role} />
            <RoleSelector selectedRole={role} onRoleChange={setRole} />
            <ContextInput context={context} onContextChange={setContext} />
          </div>
        </section>

        {/* Tools section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        {/* AI Chat Component */}
        <AIChat />

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
