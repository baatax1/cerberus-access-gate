
import React from "react";

export const HogwartsFooter = () => {
  return (
    <footer className="text-center mt-12 mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="border-t border-gray-300 flex-grow max-w-xs"></div>
        <div className="mx-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="border-t border-gray-300 flex-grow max-w-xs"></div>
      </div>
      <p className="text-sm text-muted-foreground">Cerberus Access Control Demonstration</p>
      <p className="text-xs text-muted-foreground mt-1">
        A metadata-driven gatekeeping system for agent tools
      </p>
    </footer>
  );
};
