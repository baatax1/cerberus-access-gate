
import React from "react";

export const CerberusHeader = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-red-800 bg-clip-text text-transparent">
        Cerberus Access Control
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A demonstration of role-based access control for agent systems. 
        Select your role and attempt to access different tools to see the policy in action.
      </p>
    </header>
  );
};
