"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  MessageSquare,
  Send,
  Workflow,
  Zap,
} from "lucide-react";

export interface NeuralCoreCanvasProps {
  readonly visualTitle?: string;
}

/**
 * Interactive AI Chatbot & Business Automation Core Console (Hero Right Column).
 * Directly addresses the user's request:
 * "is card ki jgha koi ai chat bots ye koi buusines automion ani choye"
 * 
 * Features:
 * 1. Live Interactive Business AI Chatbot Assistant (Customer Qualification & Booking)
 * 2. Visual Multi-Step Business Automation Pipeline (Trigger -> LLM Reasoning -> CRM Sync)
 * 3. Real-time Retell Voice Status & Available Opportunities Pill
 */
export function NeuralCoreCanvas({
  visualTitle = "AI Chatbot & Business Automation Core",
}: NeuralCoreCanvasProps) {
  const [activeTab, setActiveTab] = useState<"chatbot" | "automation">("chatbot");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "agent"; text: string }>>([
    {
      role: "agent",
      text: "Hello! I am Hasnain's autonomous sales & operations assistant. How can we automate your workflow today?",
    },
    {
      role: "user",
      text: "We spend 4 hours daily entering customer inquiries into our CRM.",
    },
    {
      role: "agent",
      text: "I can deploy an autonomous agent pipeline that captures inquiries, validates lead qualification via LLM, and instantly syncs them to your CRM with zero manual effort.",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatMessage("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      {
        role: "agent",
        text: `Got it! Hasnain can engineer a custom AI agent & webhook workflow for this. Let's schedule a call to inspect your current setup.`,
      },
    ]);
  };

  return (
    <div
      role="region"
      aria-label={`${visualTitle} interactive console`}
      className="relative mx-auto w-full max-w-[38rem] py-2"
    >
      {/* Container Card */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-400/35 bg-[#091124]/95 p-5 shadow-[0_25px_65px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-6">
        {/* Top Control Bar & Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
            </span>
            <span className="font-mono text-xs font-bold text-white tracking-wide">
              BUSINESS_AI_ENGINE // LIVE
            </span>
          </div>

          {/* Toggle between AI Chatbot and Business Automation Flow */}
          <div className="inline-flex rounded-xl border border-slate-700 bg-[#050811] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("chatbot")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-sans text-xs font-semibold transition-all ${
                activeTab === "chatbot"
                  ? "bg-sky-400 text-slate-950 shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>AI Chatbot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("automation")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-sans text-xs font-semibold transition-all ${
                activeTab === "automation"
                  ? "bg-sky-400 text-slate-950 shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Workflow className="h-3.5 w-3.5" />
              <span>Business Automation</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Live Interactive AI Chatbot Simulator */}
        {activeTab === "chatbot" ? (
          <div className="mt-4 space-y-3.5">
            {/* Chat Messages Log */}
            <div className="h-64 space-y-3 overflow-y-auto rounded-2xl border border-slate-800/80 bg-[#050811]/90 p-4 font-sans text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      msg.role === "user"
                        ? "bg-slate-700 text-white"
                        : "bg-sky-500/20 text-sky-400 border border-sky-400/30"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="font-bold text-[10px]">YOU</span>
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sky-500 text-slate-950 font-medium"
                        : "border border-slate-800 bg-[#0B1428] text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about automating your workflow or CRM..."
                className="w-full rounded-xl border border-slate-800 bg-[#050811] px-4 py-2.5 font-sans text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400 text-slate-950 hover:bg-sky-300 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          /* TAB 2: Visual Business Automation Pipeline */
          <div className="mt-4 space-y-3.5">
            <div className="rounded-2xl border border-slate-800 bg-[#050811]/90 p-4 font-mono text-xs">
              <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                ACTIVE WORKFLOW // REPETITIVE TASK AUTOMATION
              </p>

              {/* Step 1: Inbound Trigger */}
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0B1428] p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">01. INBOUND TRIGGER</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">
                      INSTANT
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400 font-sans">
                    New lead submission via Webhook / WhatsApp / Call
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center py-1">
                <span className="h-4 w-px bg-sky-400/40" />
              </div>

              {/* Step 2: Autonomous Agentic AI Reasoning */}
              <div className="flex items-start gap-3 rounded-xl border border-sky-400/40 bg-[#0B1936] p-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-400 text-slate-950">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-300">02. AI AGENT REASONING</span>
                    <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] text-sky-300">
                      SCHEMA TOOL
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-300 font-sans">
                    Qualifies intent, extracts budget/timeline &amp; scores deal
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center py-1">
                <span className="h-4 w-px bg-sky-400/40" />
              </div>

              {/* Step 3: Automated CRM & Dispatch */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0B1428] p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Database className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">03. CRM &amp; CALENDAR SYNC</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">
                      SYNCED
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400 font-sans">
                    HubSpot updated, booking invite sent via email/SMS
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Metrics Strip */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Reduces Manual Hours by 75%+</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
          >
            <span>Automate Your Business</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
