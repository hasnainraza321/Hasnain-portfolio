import { Bot, Code2, Mic, Workflow } from "lucide-react";

export type NeuralCoreFallbackReason =
  | "loading"
  | "reduced-motion"
  | "webgl-unavailable"
  | "error";

export interface NeuralCoreFallbackProps {
  readonly reason?: NeuralCoreFallbackReason;
  readonly visualTitle?: string;
}

const reasonStatusLabel: Record<NeuralCoreFallbackReason, string> = {
  loading: "INITIALIZING 3D AI CORE",
  "reduced-motion": "STATIC AI SHOWCASE",
  "webgl-unavailable": "2D AI SHOWCASE",
  error: "SAFE AI SHOWCASE",
};

/**
 * Dual Floating 3D-Tilted Glassmorphic AI System Showcase Fallback.
 * Mirrors the two angled dark glassmorphic showcase frames and bottom-right
 * "Available for new opportunities" badge from the reference Hero design.
 */
export function NeuralCoreFallback({
  reason = "loading",
  visualTitle = "Interactive AI Neural Core",
}: NeuralCoreFallbackProps) {
  return (
    <div
      role="region"
      aria-label={`${visualTitle} (${reasonStatusLabel[reason]})`}
      className="relative mx-auto w-full max-w-[34rem] py-2"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-center">
        {/* Left Tilted Glassmorphic AI Orchestrator Frame */}
        <div className="relative overflow-hidden rounded-[2rem] border border-sky-400/30 bg-[#080F22]/90 p-5 shadow-[0_25px_65px_rgba(2,132,199,0.28)] backdrop-blur-xl sm:-rotate-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-cream/55">
            <span>9:41</span>
            <span className="text-sky-400">AI CORE // LIVE</span>
          </div>

          <div className="mt-3">
            <p className="font-sans text-sm font-bold text-cream">Hi, Hasnain</p>
            <p className="font-body text-[11px] text-cream/60">
              Agentic AI Orchestrator
            </p>
          </div>

          <div className="mt-3 flex h-36 items-center justify-center rounded-2xl border border-sky-400/20 bg-[#050811]/90">
            <svg
              viewBox="0 0 180 180"
              className="h-28 w-28 text-sky-400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="90"
                cy="90"
                r="68"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              <polygon
                points="90,22 148,56 148,124 90,158 32,124 32,56"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="90" cy="90" r="20" fill="#38BDF8" fillOpacity="0.85" />
            </svg>
          </div>

          <div className="mt-3.5 rounded-2xl bg-gradient-to-br from-white/95 to-sky-100/90 p-3.5 text-[#050811]">
            <p className="font-mono text-[10px] font-semibold tracking-wider text-slate-600 uppercase">
              Active Pipeline Mode
            </p>
            <p className="mt-0.5 font-sans text-base font-extrabold tracking-tight text-[#050811]">
              Multi-Agent + Voice AI
            </p>
          </div>

          <div className="mt-3 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-500/25 to-blue-600/25 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold text-sky-300 uppercase">
                LLM Tool Execution
              </span>
              <span className="h-2 w-2 rounded-full bg-sky-400" />
            </div>
            <p className="mt-1 font-mono text-[11px] text-cream/85">
              {reasonStatusLabel[reason]}
            </p>
          </div>
        </div>

        {/* Right Tilted Glassmorphic AI Systems Discover Frame */}
        <div className="relative overflow-hidden rounded-[2rem] border border-sky-400/25 bg-[#080F22]/90 p-5 shadow-[0_25px_65px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:translate-y-4 sm:rotate-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-cream/55">
            <span>SYS // 04</span>
            <span className="text-sky-400">VERIFIED</span>
          </div>

          <p className="mt-3 font-sans text-base font-bold text-cream">
            Discover Systems
          </p>
          <p className="font-mono text-[10px] tracking-wider text-sky-400 uppercase">
            Featured Capabilities
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-sky-400/25 bg-gradient-to-b from-sky-500/20 to-[#050811] p-3">
              <p className="font-editorial text-sm text-sky-300">
                Autonomous
              </p>
              <p className="font-sans text-xs font-bold text-cream">
                AI Agents
              </p>
              <p className="mt-1 font-mono text-[9px] text-cream/60">
                LLM &amp; Tool Calling
              </p>
            </div>
            <div className="rounded-xl border border-cream/15 bg-gradient-to-b from-blue-500/15 to-[#050811] p-3">
              <p className="font-editorial text-sm text-sky-300">
                Conversational
              </p>
              <p className="font-sans text-xs font-bold text-cream">
                Retell Voice AI
              </p>
              <p className="mt-1 font-mono text-[9px] text-cream/60">
                Call Automation
              </p>
            </div>
          </div>

          <p className="mt-3.5 font-mono text-[10px] text-cream/65 uppercase">
            Core Stack Pillars
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2 text-center">
            <div className="rounded-lg border border-sky-400/25 bg-sky-500/10 p-2">
              <Bot className="mx-auto h-3.5 w-3.5 text-sky-400" />
              <span className="mt-1 block font-mono text-[9px] text-cream/80">
                Agents
              </span>
            </div>
            <div className="rounded-lg border border-sky-400/25 bg-sky-500/10 p-2">
              <Mic className="mx-auto h-3.5 w-3.5 text-sky-400" />
              <span className="mt-1 block font-mono text-[9px] text-cream/80">
                Voice
              </span>
            </div>
            <div className="rounded-lg border border-sky-400/25 bg-sky-500/10 p-2">
              <Code2 className="mx-auto h-3.5 w-3.5 text-sky-400" />
              <span className="mt-1 block font-mono text-[9px] text-cream/80">
                Next.js
              </span>
            </div>
            <div className="rounded-lg border border-sky-400/25 bg-sky-500/10 p-2">
              <Workflow className="mx-auto h-3.5 w-3.5 text-sky-400" />
              <span className="mt-1 block font-mono text-[9px] text-cream/80">
                CRM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
