/**
 * Core TypeScript contracts for Hasnain's Personal Portfolio.
 * Strict mode compliant — zero `any` usage.
 */

export type SectionId =
  | "home"
  | "about"
  | "expertise"
  | "projects"
  | "process"
  | "contact";

export interface NavigationItem {
  readonly id: SectionId;
  readonly label: string;
  readonly href: `#${SectionId}`;
}

export interface NavigationConfig {
  readonly brandWordmark: string;
  readonly items: readonly NavigationItem[];
  readonly primaryCta: {
    readonly label: string;
    readonly href: `#${SectionId}`;
  };
}

export type ExpertiseCategoryId =
  | "agentic-ai"
  | "business-automation"
  | "full-stack"
  | "backend-infra";

export interface ExpertiseSkillItem {
  readonly name: string;
  readonly summary?: string;
}

export interface ExpertisePillar {
  readonly id: ExpertiseCategoryId;
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly technologies: readonly string[];
}

export type ProjectStatus = "Live" | "Case Study" | "In Progress";

export type ShowcaseCategory =
  | "all"
  | "web-dev"
  | "voice-ai"
  | "chatbots"
  | "ai-nlp"
  | "automation"
  | "integrations";

export interface ShowcaseProject {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly filterCategory: ShowcaseCategory;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly previewType: "web" | "voice" | "chat" | "nlp" | "crm" | "agent";
  readonly badge?: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
  readonly isExternal: boolean;
}

export interface PortfolioProject {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly status: ProjectStatus;
  readonly summary: string;
  readonly businessProblem: string;
  readonly solutionOverview: string;
  readonly contribution: readonly string[];
  readonly technologies: readonly string[];
  readonly verifiedOutcome?: string;
  readonly imageAlt?: string;
  readonly imageSrc?: string;
  readonly links: readonly ProjectLink[];
  readonly isContentConfirmed: boolean;
}

export interface CustomerJourneyStep {
  readonly stepNumber: string;
  readonly id: string;
  readonly stageTag: string;
  readonly title: string;
  readonly description: string;
  readonly supportingLabel: string;
}

export interface DevelopmentProcessStep {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "email"
  | "whatsapp"
  | "phone";

export interface SocialLinkItem {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: string;
  readonly handle?: string;
  readonly isVerified: boolean;
}

export interface ContactConfig {
  readonly headline: string;
  readonly supportingCopy: string;
  readonly emailAddress: string;
  readonly phoneNumber: string;
  readonly whatsappNumber: string;
  readonly whatsappUrl: string;
  readonly phoneDialUrl: string;
  readonly socialLinks: readonly SocialLinkItem[];
  readonly isFormEnabled: boolean;
  readonly isDeliveryConfigured: boolean;
}

