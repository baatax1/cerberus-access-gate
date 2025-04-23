
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

// TEMPORARY: You should store your API key more securely in production!
const OPENAI_API_KEY = "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";

type Message = { user: "student" | "ai"; text: string; timestamp: number };

async function fetchOpenAI(messages: { role: "system" | "user" | "assistant", content: string }[]) {
  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages
    })
  });
  if (!result.ok) {
    throw new Error("Failed to fetch response from OpenAI");
  }
  const data = await result.json();
  return data.choices?.[0]?.message?.content ?? "Sorry, I couldn't find an answer.";
}

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

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = {
      user: "student",
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create OpenAI chat history format
    const openAIMessages = [
      { role: "system", content: "You are a helpful assistant who helps Hogwarts students with access policies." },
      ...messages.map(m => ({
        role: m.user === "student" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: input }
    ];

    try {
      const reply = await fetchOpenAI(openAIMessages);
      setMessages(prev => [
        ...prev,
        { user: "ai", text: reply, timestamp: Date.now() }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { user: "ai", text: "Sorry, there was an error contacting the server.", timestamp: Date.now() }
      ]);
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${
                message.user === "student" ? "justify-end" : "justify-start"
              } mb-2`}
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
          className="flex space-x-2 mt-auto"
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
