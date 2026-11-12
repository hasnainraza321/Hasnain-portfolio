import type {
  ContactConfig,
  CustomerJourneyStep,
  DevelopmentProcessStep,
  ExpertisePillar,
  NavigationConfig,
  PortfolioProject,
  SectionId,
  ShowcaseCategory,
  ShowcaseProject,
} from "@/types/portfolio";

export interface HeroContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly introduction: string;
  readonly supportingDescription: string;
  readonly primaryCta: {
    readonly label: string;
    readonly href: `#${SectionId}`;
  };
  readonly secondaryCta: {
    readonly label: string;
    readonly href: `#${SectionId}`;
  };
  readonly visualConcept: string;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly summary: string;
  readonly engineeringMindset: readonly string[];
  readonly isExtendedBioConfirmed: boolean;
}

/**
 * 1. Navigation Configuration
 */
export const navigationConfig: NavigationConfig = {
  brandWordmark: "Hasnain Raza",
  items: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "expertise", label: "Expertise", href: "#expertise" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "process", label: "Process", href: "#process" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  primaryCta: {
    label: "Let's Talk",
    href: "#contact",
  },
};

/**
 * 2. Hero Content
 */
export const heroContent: HeroContent = {
  eyebrow: "Full-Stack AI Automation Developer | Agentic AI Engineer",
  headline: "Build Smarter Businesses with AI Agents & AI Voice Agent Automation",
  introduction:
    "Hi, I'm Hasnain Raza — I design and build intelligent AI agents, real-time voice agent automation systems, and scalable full-stack applications.",
  supportingDescription:
    "My priority is to turn your repetitive manual tasks into intelligent automated workflows, solve real-world business problems, and help businesses save time, reduce operational costs, and scale efficiently.",
  primaryCta: {
    label: "Explore My Work",
    href: "#projects",
  },
  secondaryCta: {
    label: "Let's Connect",
    href: "#contact",
  },
  visualConcept: "Interactive AI Chatbot & Business Automation Core",
};

/**
 * 3. About Content — Updated strictly per Hasnain Raza's business + engineering background
 */
export const aboutContent: AboutContent = {
  eyebrow: "01 / ABOUT HASNAIN RAZA",
  heading: "Bridging Business Strategy with AI Engineering",
  summary:
    "I'm Hasnain Raza, a business graduate and Full-Stack AI Automation Developer specializing in Agentic AI engineering, and intelligent business automation. With a background in Business Administration & Marketing, I understand how businesses operate, where inefficiencies occur, and how technology can solve real operational challenges. I combine this business knowledge with hands-on expertise in AI Agents, AI Voice Agent N8N Automation, Next.js, Python Backend Development, and API Integrations to build scalable digital solutions that streamline workflows, automate repetitive tasks, and improve business efficiency.",
  engineeringMindset: [
    "01 / Business & Strategy: Business management, finance, accounting, sales, marketing, and B2B lead generation.",
    "02 / Agentic AI & Voice Agent Automation: Intelligent AI agents, conversational voice systems, LLM workflows, and business automation.",
    "03 / Full-Stack Engineering: Modern web applications, Next.js, React, TypeScript, backend systems, and API development.",
    "04 / Workflow & CRM Automation: Business process automation, CRM integrations, data pipelines, and intelligent workflow orchestration.",
  ],
  isExtendedBioConfirmed: true,
};

/**
 * 4. Expertise Pillars — Updated with Hasnain's exact Core Expertise stack
 */
export const expertisePillars: readonly ExpertisePillar[] = [
  {
    id: "agentic-ai",
    index: "01",
    title: "AI & Agentic Systems",
    description:
      "Autonomous reasoning loops, multi-agent coordination, conversational voice systems, and intelligent document retrieval.",
    capabilities: [
      "AI Agents & Multi-Agent Systems",
      "AI Voice Agents",
      "Agentic AI & LLM Integration",
      "RAG Systems & AI Search",
      "AI Chatbots & Virtual Assistants",
      "Intelligent Document Processing",
    ],
    technologies: ["LangGraph", "Retell AI", "OpenAI / Claude", "RAG Pipelines", "Python"],
  },
  {
    id: "business-automation",
    index: "02",
    title: "Business Automation",
    description:
      "End-to-end workflow orchestration, CRM sync, autonomous lead generation, and webhook data pipelines.",
    capabilities: [
      "n8n Workflow Automation",
      "Business Process Automation",
      "CRM Systems & Integrations",
      "AI SDR & Lead Generation Systems",
      "Sales & Marketing Automation",
      "API & Webhook Integrations",
    ],
    technologies: ["n8n", "HubSpot", "GoHighLevel", "Zapier", "Webhooks", "Lead Gen"],
  },
  {
    id: "full-stack",
    index: "03",
    title: "Full-Stack Development",
    description:
      "High-performance web applications, custom business platforms, scalable dashboards, and modular SaaS solutions.",
    capabilities: [
      "Web Application Development",
      "Next.js, React & TypeScript",
      "Python Backend Development",
      "Custom Business Platforms",
      "Admin Panels & Dashboards",
      "SaaS Application Development",
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Python"],
  },
  {
    id: "backend-infra",
    index: "04",
    title: "Backend & Infrastructure",
    description:
      "Robust REST APIs, relational database design, cloud deployment, authentication, and secure production infrastructure.",
    capabilities: [
      "REST APIs & Backend Systems",
      "Database Design & Management",
      "Authentication & Authorization",
      "Cloud Deployment & Hosting",
      "Third-Party Integrations",
      "Security & Performance Optimization",
    ],
    technologies: ["REST APIs", "PostgreSQL", "Supabase", "Docker", "Cloud Hosting"],
  },
];

/**
 * 5. Featured Projects
 */
export const featuredProjects: readonly PortfolioProject[] = [
  {
    id: "rehmani-bridal-collection",
    index: "01",
    title: "Rehmani Bridal Collection Platform",
    category: "Full-Stack Web & Catalog Infrastructure",
    status: "Case Study",
    summary:
      "Full-stack digital catalog and showcase platform with responsive navigation and optimized asset delivery.",
    businessProblem:
      "Traditional bridal businesses need high-fidelity visual catalogs with fast loading times and clear inquiry routing.",
    solutionOverview:
      "Engineered with Next.js App Router and Tailwind CSS for mobile-first performance and reliable customer inquiry collection.",
    contribution: [
      "Responsive frontend UI and component architecture",
      "Type-safe form handling and client-side validation",
      "Production deployment and asset optimization",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [],
    isContentConfirmed: false,
  },
  {
    id: "ai-sdr-platform",
    index: "02",
    title: "Autonomous AI SDR Pipeline",
    category: "Agentic AI & Multi-Agent Workflows",
    status: "Case Study",
    summary:
      "Automated lead qualification and outreach pipeline driven by multi-agent reasoning and schema-enforced tool execution.",
    businessProblem:
      "Sales teams spend excessive manual hours researching leads, verifying company data, and drafting tailored initial contact points.",
    solutionOverview:
      "Architected an agent workflow that inspects company metadata, validates criteria against ideal customer profiles, and logs results directly to CRM.",
    contribution: [
      "LLM prompt and schema validation architecture",
      "External API tool integration and retry handling",
      "End-to-end data pipeline from lead intake to CRM logging",
    ],
    technologies: ["AI Agents", "LLM APIs", "TypeScript", "Next.js", "CRM Webhooks"],
    links: [],
    isContentConfirmed: false,
  },
  {
    id: "voice-ai-agent-projects",
    index: "03",
    title: "Conversational Voice AI Agent",
    category: "Voice AI & Operational Automation",
    status: "Case Study",
    summary:
      "Low-latency voice assistant that answers inbound customer calls, handles qualification queries, and books appointments.",
    businessProblem:
      "Businesses lose high-intent callers during peak hours and outside operating hours due to missed calls.",
    solutionOverview:
      "Configured Retell AI with structured knowledge prompts, webhook endpoints, and real-time scheduling calendar integrations.",
    contribution: [
      "Retell voice prompt tuning and conversation tree design",
      "Webhook route handlers for real-time slot checking",
      "Knowledge retrieval integration for accurate caller answers",
    ],
    technologies: [
      "Retell AI",
      "Voice Webhooks",
      "Calendar Integration",
      "TypeScript",
    ],
    links: [],
    isContentConfirmed: false,
  },
  {
    id: "real-estate-crm-automation",
    index: "04",
    title: "Real Estate Portal & CRM Sync",
    category: "Full-Stack & Event-Driven Automation",
    status: "Case Study",
    summary:
      "Property showcase platform paired with instant webhook-triggered lead routing and CRM contact synchronization.",
    businessProblem:
      "Property inquiries from multiple channels were delayed due to manual entry into sales spreadsheets.",
    solutionOverview:
      "Built a unified web frontend with automated webhook triggers that instantly route validated leads into the CRM.",
    contribution: [
      "Next.js web portal with interactive property cards",
      "Validated inquiry form pipeline with automated CRM delivery",
      "Zapier webhook automations for instant notification alerts",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "CRM Integration",
      "API & Webhooks",
      "Zapier",
    ],
    links: [],
    isContentConfirmed: false,
  },
];

/**
 * Filter Tabs for the Showcase Projects Section
 */
export interface ShowcaseFilterTab {
  readonly id: ShowcaseCategory;
  readonly label: string;
}

export const showcaseFilterTabs: readonly ShowcaseFilterTab[] = [
  { id: "all", label: "All Projects" },
  { id: "web-dev", label: "Web Development" },
  { id: "voice-ai", label: "Voice Agents" },
  { id: "chatbots", label: "Chatbots" },
  { id: "ai-nlp", label: "AI & NLP" },
  { id: "automation", label: "Automation" },
  { id: "integrations", label: "Integrations" },
];

/**
 * Showcase Projects — Professional breadth demonstration across Web, Voice AI, Chatbots, NLP & Automation
 */
export const showcaseProjects: readonly ShowcaseProject[] = [
  // A. Web Development
  {
    id: "ecommerce-web-platform",
    index: "01",
    title: "E-Commerce Web Platform",
    category: "Web Development",
    filterCategory: "web-dev",
    description: "Modern online shopping experiences with dynamic product catalogs, fluid cart, and fast checkout.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    previewType: "web",
    badge: "Full-Stack",
  },
  {
    id: "corporate-business-portal",
    index: "02",
    title: "Corporate Business Portal",
    category: "Web Development",
    filterCategory: "web-dev",
    description: "High-performance enterprise websites engineered for conversion funnels and brand authority.",
    technologies: ["Next.js", "React 19", "Server Actions", "TypeScript"],
    previewType: "web",
    badge: "Production",
  },
  {
    id: "real-estate-web-platform",
    index: "03",
    title: "Real Estate Property Portal",
    category: "Web Development",
    filterCategory: "web-dev",
    description: "Property listings showcase with interactive search filters, virtual tour cards, and agent lead routing.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    previewType: "web",
    badge: "Full-Stack",
  },
  {
    id: "custom-admin-dashboard",
    index: "04",
    title: "Custom Admin & Analytics Dashboard",
    category: "Web Development",
    filterCategory: "web-dev",
    description: "High-density operational analytics, role-based access control, and real-time business telemetry.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    previewType: "web",
    badge: "Internal Tool",
  },
  {
    id: "creative-portfolio-showcase",
    index: "05",
    title: "Editorial Portfolio Showcase",
    category: "Web Development",
    filterCategory: "web-dev",
    description: "Bespoke personal branding platform with 60fps dynamic canvas animations and responsive layout.",
    technologies: ["Next.js", "TypeScript", "HTML5 Canvas", "Tailwind CSS"],
    previewType: "web",
    badge: "Showcase",
  },

  // B. AI Voice Agents
  {
    id: "medical-voice-agent",
    index: "06",
    title: "Medical Voice Agent",
    category: "AI Voice Agents",
    filterCategory: "voice-ai",
    description: "AI-powered healthcare call triage, patient symptom inquiry handling, and clinic appointment booking.",
    technologies: ["Retell AI", "Voice Webhooks", "Python", "FastAPI"],
    previewType: "voice",
    badge: "Voice AI",
  },
  {
    id: "healthcare-appointment-agent",
    index: "07",
    title: "Healthcare Appointment Scheduling Agent",
    category: "AI Voice Agents",
    filterCategory: "voice-ai",
    description: "Autonomous phone agent that checks physician availability in real time and confirms patient slots.",
    technologies: ["Retell AI", "Google Calendar API", "Webhooks", "TypeScript"],
    previewType: "voice",
    badge: "Automated",
  },
  {
    id: "ai-calling-agent",
    index: "08",
    title: "Inbound & Outbound Calling Agent",
    category: "AI Voice Agents",
    filterCategory: "voice-ai",
    description: "Sub-second latency voice assistant handling high-volume customer inquiries and follow-up campaigns.",
    technologies: ["Retell AI", "Twilio", "LLM Streaming", "Webhooks"],
    previewType: "voice",
    badge: "Low Latency",
  },
  {
    id: "customer-support-voice-agent",
    index: "09",
    title: "Customer Support Voice Agent",
    category: "AI Voice Agents",
    filterCategory: "voice-ai",
    description: "24/7 intelligent caller assistance handling complex multi-turn support queries with zero wait time.",
    technologies: ["Retell AI", "Knowledge Retrieval", "Node.js", "REST APIs"],
    previewType: "voice",
    badge: "24/7 Live",
  },
  {
    id: "real-estate-voice-agent",
    index: "10",
    title: "Real Estate Voice Assistant",
    category: "AI Voice Agents",
    filterCategory: "voice-ai",
    description: "Conversational voice agent answering property inquiries and instantly booking on-site showings.",
    technologies: ["Retell AI", "CRM Webhooks", "Calendar Sync", "Python"],
    previewType: "voice",
    badge: "Voice Agent",
  },

  // C. AI Chatbots & Conversational AI
  {
    id: "customer-support-chatbot",
    index: "11",
    title: "Customer Support AI Chatbot",
    category: "AI Chatbots",
    filterCategory: "chatbots",
    description: "Context-aware conversational assistant for instant customer troubleshooting and ticket resolution.",
    technologies: ["LangChain", "OpenAI API", "Next.js", "Vector DB"],
    previewType: "chat",
    badge: "Conversational",
  },
  {
    id: "website-ai-concierge",
    index: "12",
    title: "Website AI Concierge",
    category: "AI Chatbots",
    filterCategory: "chatbots",
    description: "Interactive website AI guiding visitors, answering product questions, and driving lead conversions.",
    technologies: ["React", "LLM Streaming", "TypeScript", "Tailwind CSS"],
    previewType: "chat",
    badge: "Live Agent",
  },
  {
    id: "knowledge-base-rag-chatbot",
    index: "13",
    title: "Knowledge Base RAG Chatbot",
    category: "AI Chatbots",
    filterCategory: "chatbots",
    description: "Semantic search assistant querying private internal documents, compliance rules, and company SOPs.",
    technologies: ["Pinecone", "RAG Pipeline", "OpenAI", "Python"],
    previewType: "chat",
    badge: "RAG System",
  },
  {
    id: "lead-qualification-chatbot",
    index: "14",
    title: "Lead Qualification AI Chatbot",
    category: "AI Chatbots",
    filterCategory: "chatbots",
    description: "Autonomous visitor scoring, high-intent discovery, and instant automated CRM contact enrichment.",
    technologies: ["LLM Tool Calling", "HubSpot", "Webhooks", "Next.js"],
    previewType: "chat",
    badge: "Lead Gen",
  },

  // D. AI & NLP Automation
  {
    id: "nlp-automation-system",
    index: "15",
    title: "NLP Automation System",
    category: "AI & NLP",
    filterCategory: "ai-nlp",
    description: "Intelligent text processing, intent extraction, and automated workflow triggers for business data.",
    technologies: ["Python", "NLP Models", "LangGraph", "FastAPI"],
    previewType: "nlp",
    badge: "NLP Engine",
  },
  {
    id: "intelligent-document-processing",
    index: "16",
    title: "Intelligent Document Processing (IDP)",
    category: "AI & NLP",
    filterCategory: "ai-nlp",
    description: "Automated PDF, invoice, and receipt parsing with structured JSON schema validation and zero manual entry.",
    technologies: ["Document AI", "OCR", "Pydantic", "Python"],
    previewType: "nlp",
    badge: "Structured Data",
  },
  {
    id: "text-classification-engine",
    index: "17",
    title: "Text Classification & Sentiment Engine",
    category: "AI & NLP",
    filterCategory: "ai-nlp",
    description: "Multi-label document categorization, incoming message sentiment analysis, and automated ticket prioritization.",
    technologies: ["HuggingFace", "Python", "Docker", "FastAPI"],
    previewType: "nlp",
    badge: "Classification",
  },
  {
    id: "ai-data-extraction-pipeline",
    index: "18",
    title: "AI Data Extraction Pipeline",
    category: "AI & NLP",
    filterCategory: "ai-nlp",
    description: "Unstructured web and document data parser transforming raw information into clean database records.",
    technologies: ["Python", "OpenAI API", "PostgreSQL", "Supabase"],
    previewType: "nlp",
    badge: "Data Pipeline",
  },

  // E. CRM & Business Integrations
  {
    id: "crm-integration-system",
    index: "19",
    title: "CRM Integration & Sync Platform",
    category: "CRM & Integrations",
    filterCategory: "integrations",
    description: "Connected customer management pipelines and bidirectional contact synchronization across SaaS stacks.",
    technologies: ["HubSpot API", "GoHighLevel", "REST APIs", "Webhooks"],
    previewType: "crm",
    badge: "Integration",
  },
  {
    id: "resimpli-crm-automation",
    index: "20",
    title: "Resimpli Real Estate CRM Automation",
    category: "CRM & Integrations",
    filterCategory: "integrations",
    description: "Automated property lead ingestion, deal stage updates, and investor task tracking for real estate.",
    technologies: ["Resimpli API", "Webhooks", "n8n", "TypeScript"],
    previewType: "crm",
    badge: "CRM Sync",
  },
  {
    id: "n8n-workflow-automation",
    index: "21",
    title: "n8n Workflow Automation Engine",
    category: "Automation",
    filterCategory: "automation",
    description: "Event-driven workflow orchestration connecting sales funnels, accounting systems, and notification channels.",
    technologies: ["n8n", "Event Webhooks", "API Bridges", "PostgreSQL"],
    previewType: "crm",
    badge: "Workflow Engine",
  },
  {
    id: "automated-lead-routing",
    index: "22",
    title: "Automated Lead Routing & Follow-up",
    category: "Automation",
    filterCategory: "automation",
    description: "Instant lead scoring, territorial assignment, and automated SMS/Email follow-up sequences.",
    technologies: ["Twilio", "SendGrid", "CRM Webhooks", "Node.js"],
    previewType: "crm",
    badge: "Automation",
  },

  // F. Other AI Applications
  {
    id: "agentic-ai-multi-agent",
    index: "23",
    title: "Agentic AI Multi-Agent System",
    category: "Agentic AI",
    filterCategory: "ai-nlp",
    description: "Autonomous multi-agent orchestration with role specialization, supervisor delegation, and self-correction.",
    technologies: ["LangGraph", "Multi-Agent", "Python", "Claude API"],
    previewType: "agent",
    badge: "Agentic AI",
  },
  {
    id: "tool-calling-ai-agent",
    index: "24",
    title: "Tool-Calling AI Agent",
    category: "Agentic AI",
    filterCategory: "automation",
    description: "Deterministic external API and database execution powered by structured LLM function calling schemas.",
    technologies: ["Tool Calling", "OpenAI Functions", "FastAPI", "Pydantic"],
    previewType: "agent",
    badge: "Tool Calling",
  },
];

/**
 * 6. Development Process
 */
export const developmentProcessSteps: readonly DevelopmentProcessStep[] = [
  {
    stepNumber: "01",
    id: "discovery",
    title: "Discovery & Bottleneck Audit",
    summary:
      "Identifying manual business bottlenecks, operational workflows, and concrete integration targets.",
    deliverables: [
      "Workflow bottleneck map",
      "Technical requirements scope",
      "Success metrics",
    ],
  },
  {
    stepNumber: "02",
    id: "architecture-design",
    title: "System & Schema Architecture",
    summary:
      "Specifying API contracts, database schemas, LLM tool definitions, and failure recovery boundaries.",
    deliverables: [
      "Data contracts & schemas",
      "Agent tool definitions",
      "Security boundary review",
    ],
  },
  {
    stepNumber: "03",
    id: "development",
    title: "Full-Stack & Agent Development",
    summary:
      "Writing type-safe TypeScript code, configuring voice models, and building clean web interfaces.",
    deliverables: [
      "Clean TypeScript code",
      "Deterministic agent logic",
      "Responsive UI components",
    ],
  },
  {
    stepNumber: "04",
    id: "integration-testing",
    title: "API, CRM & Voice Integration",
    summary:
      "Connecting webhooks, Retell AI voice streams, and CRM endpoints with robust error logging.",
    deliverables: [
      "End-to-end webhook wiring",
      "Live Retell voice testing",
      "CRM sync validation",
    ],
  },
  {
    stepNumber: "05",
    id: "testing",
    title: "Rigorous Edge-Case Validation",
    summary:
      "Verifying schema validation, fallback paths, mobile responsiveness, and security headers.",
    deliverables: [
      "TypeScript & lint passes",
      "Failure mode verification",
      "Production build check",
    ],
  },
  {
    stepNumber: "06",
    id: "deployment",
    title: "Production Launch & Handover",
    summary:
      "Deploying optimized production builds with complete documentation and clean operational handover.",
    deliverables: [
      "Live deployment",
      "Environment isolation",
      "Operational handover notes",
    ],
  },
];

/**
 * 6.1 Customer Journey Steps — Four-Step Business Transformation Journey
 */
export const customerJourneySteps: readonly CustomerJourneyStep[] = [
  {
    stepNumber: "01",
    id: "step-discover",
    stageTag: "DISCOVER",
    title: "Tell Me About Your Business",
    description:
      "Share what your business does, the challenges you're facing, and what you'd like to improve. We'll start with a conversation about your goals.",
    supportingLabel: "Understanding Your Needs",
  },
  {
    stepNumber: "02",
    id: "step-plan",
    stageTag: "PLAN",
    title: "Find the Right Way Forward",
    description:
      "Together, we'll identify the right solution, agree on what needs to be done, and establish a clear direction, timeline, and budget before moving forward.",
    supportingLabel: "A Clear Plan",
  },
  {
    stepNumber: "03",
    id: "step-create",
    stageTag: "CREATE",
    title: "Let's Bring Your Solution to Life",
    description:
      "I'll build a solution around your business needs, whether it's an AI assistant, an automated workflow, a voice agent, or a complete digital experience.",
    supportingLabel: "Built Around Your Business",
  },
  {
    stepNumber: "04",
    id: "step-deliver",
    stageTag: "DELIVER",
    title: "Ready for Your Business",
    description:
      "Once everything is ready, I'll walk you through your solution, explain how to use it, and hand it over so you can put it to work.",
    supportingLabel: "Ready to Move Forward",
  },
];

/**
 * 7. Contact Configuration
 */
export const contactConfig: ContactConfig = {
  headline: "Let's Build Your Automation or Full-Stack System",
  supportingCopy:
    "Have an AI agent, voice automation, or web application project to build? Reach out directly via WhatsApp, email, or send your inquiry details below.",
  emailAddress: "hr1228744@gmail.com",
  phoneNumber: "03198185308",
  whatsappNumber: "03198185308",
  whatsappUrl: "https://wa.me/923198185308",
  phoneDialUrl: "tel:+923198185308",
  socialLinks: [
    {
      platform: "whatsapp",
      label: "WhatsApp",
      handle: "03198185308",
      href: "https://wa.me/923198185308",
      isVerified: true,
    },
    {
      platform: "email",
      label: "Email",
      handle: "hr1228744@gmail.com",
      href: "mailto:hr1228744@gmail.com",
      isVerified: true,
    },
    {
      platform: "phone",
      label: "Phone",
      handle: "0319 8185308",
      href: "tel:+923198185308",
      isVerified: true,
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      handle: "hasnain-raza",
      href: "https://www.linkedin.com/in/hasnain-raza-47b6b2294/",
      isVerified: true,
    },
    {
      platform: "github",
      label: "GitHub",
      handle: "hasnainraza321",
      href: "https://github.com/hasnainraza321",
      isVerified: true,
    },
    {
      platform: "instagram",
      label: "Instagram",
      handle: "@hasn_ainraza.ai",
      href: "https://www.instagram.com/hasn_ainraza.ai/",
      isVerified: true,
    },
  ],
  isFormEnabled: true,
  isDeliveryConfigured: false,
};
