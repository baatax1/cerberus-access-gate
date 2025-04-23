
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type Message = { user: "student" | "ai"; text: string; timestamp: number };

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      user: "ai", 
      text: "How can I help you with access policies today?", 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSend() {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      user: "student", 
      text: input, 
      timestamp: Date.now()
    };
    
    // Add AI response
    const aiResponse: Message = {
      user: "ai", 
      text: "Processing your request...", 
      timestamp: Date.now() + 1
    };
    
    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          user: "ai",
          text: "Here's some information about your access policies.",
          timestamp: Date.now()
        };
        return updatedMessages;
      });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="h-64 overflow-y-auto mb-4 space-y-2">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${
                message.user === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div 
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  message.user === "student" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-gray-500 italic">
              Assistant is typing...
            </div>
          )}
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about access policies..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
