
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ContextInputProps {
  context: string;
  onContextChange: (context: string) => void;
}

export const ContextInput = ({ context, onContextChange }: ContextInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Request Context (Optional)
      </label>
      <Textarea
        placeholder="Add additional context for your request..."
        value={context}
        onChange={(e) => onContextChange(e.target.value)}
        className="min-h-[80px]"
      />
      <div className="mt-1 text-sm text-gray-500">
        This will be included in the results when access is granted.
      </div>
    </div>
  );
};
