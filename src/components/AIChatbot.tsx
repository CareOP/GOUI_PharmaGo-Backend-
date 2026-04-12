import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI health assistant. I can help you assess symptoms, find doctors, or answer health-related questions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: userText }),
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.assessment,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "assistant", content: "Sorry, I'm having trouble connecting. Please check if the backend server is running." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-[#2DD4BF] hover:bg-[#26bba8]">
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[540px] shadow-2xl z-50 flex flex-col border-none bg-[#0B1120] text-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-[#2DD4BF]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-white">AI Health Assistant</CardTitle>
            <p className="text-[10px] text-white/80">Powered by PharmaGO AI</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-black/10">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 bg-[#0B1120]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", m.role === "user" ? "bg-[#2DD4BF]" : "bg-white/10")}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-[#2DD4BF]" />}
                </div>
                <div className={cn("max-w-[80%] rounded-2xl px-4 py-2 text-sm", m.role === "user" ? "bg-[#1E293B] text-white" : "bg-[#161E2E] text-slate-300 border border-white/5")}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Bot className="h-4 w-4 text-[#2DD4BF]" /></div>
                <div className="bg-[#161E2E] rounded-2xl px-4 py-3"><span className="animate-pulse text-[#2DD4BF]">...</span></div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-[#0F172A] border-t border-white/5">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms..." 
              className="bg-[#1E293B] border-none text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#2DD4BF]"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="bg-[#2DD4BF] hover:bg-[#26bba8]">
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}