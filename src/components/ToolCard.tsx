
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorrowResponse, Tool } from "@/api/cerberusApi";
import { BookOpen, BookX, Scroll } from "lucide-react";

interface ToolCardProps {
  toolId: Tool;
  title: string;
  description: string;
  onAccessAttempt: (toolId: Tool) => Promise<BorrowResponse>;
}

export const ToolCard = ({ toolId, title, description, onAccessAttempt }: ToolCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<BorrowResponse | null>(null);

  const handleAccessAttempt = async () => {
    setIsLoading(true);
    try {
      const result = await onAccessAttempt(toolId);
      setResponse(result);
    } catch (error) {
      console.error("Error accessing tool:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    switch (toolId) {
      case "standardBook":
        return <BookOpen className="h-10 w-10 text-amber-700" />;
      case "restrictedSection":
        return <BookX className="h-10 w-10 text-red-700" />;
      case "cursedScroll":
        return <Scroll className="h-10 w-10 text-purple-800" />;
      default:
        return <BookOpen className="h-10 w-10" />;
    }
  };

  const getCardStyle = () => {
    if (!response) return "border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300";
    return response.success 
      ? "border-green-500 shadow-md shadow-green-100"
      : "border-red-500 shadow-md shadow-red-100";
  };

  const getResultClass = () => {
    if (!response) return "";
    return response.success ? "text-green-700" : "text-red-700";
  };

  return (
    <Card className={`${getCardStyle()} transition-colors`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2">
            {getIcon()}
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {response && (
          <div className={`rounded-md p-3 ${response.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-semibold ${getResultClass()}`}>{response.message}</p>
            {response.result && <p className="mt-1">{response.result}</p>}
            {response.error && <p className="text-red-700 mt-1">Error: {response.error}</p>}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAccessAttempt} 
          disabled={isLoading}
          className="w-full"
          variant={response?.success ? "default" : "outline"}
        >
          {isLoading ? "Attempting Access..." : "Request Access"}
        </Button>
      </CardFooter>
    </Card>
  );
};
