
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

type Message = { user: "student" | "ai"; text: string };

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { user: "ai", text: "👋 Hello! I am the Restricted Section Assistant. Ask me anything about Hogwarts access policies or books." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { user: "student", text: input }]);
    setIsLoading(true);

    // Simulate AI reply (replace with real API later)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          user: "ai",
          text: "This is a demo AI assistant. Provide more integration to connect a real LLM!",
        },
      ]);
      setIsLoading(false);
    }, 1000);

    setInput("");
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader className="flex flex-row gap-2 items-center pb-2">
        <MessageCircle className="w-5 h-5 text-green-700 mr-1" />
        <CardTitle className="text-lg font-semibold">Restricted Section Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 min-h-[160px] max-h-64 overflow-y-auto mb-4 border rounded-md p-3 bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.user === "student" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`px-3 py-1 rounded-lg text-sm ${
                  m.user === "student"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-xs italic text-gray-400">AI Assistant is typing…</div>
          )}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
