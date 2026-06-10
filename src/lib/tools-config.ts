import {
  Mail, ClipboardList, ListChecks, BookOpen, MessageSquare, Hash, Lightbulb,
  Megaphone, Calendar, TrendingUp, Send, BarChart3, Library,
  type LucideIcon,
} from "lucide-react";

export type FieldType = "text" | "textarea" | "select";

export type ToolField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type ToolConfig = {
  slug: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  category: "productivity" | "content" | "strategy";
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  fields: ToolField[];
  tone: string; // tile color class
};

const tones = [
  "bg-tile-pink text-tile-pink-ink",
  "bg-tile-blue text-tile-blue-ink",
  "bg-tile-lavender text-tile-lavender-ink",
  "bg-tile-beige text-tile-beige-ink",
  "bg-tile-grey text-tile-grey-ink",
  "bg-tile-cream text-tile-cream-ink",
];

const TONES = [
  "Professional", "Friendly", "Casual", "Persuasive", "Enthusiastic", "Formal", "Witty",
];
const PLATFORMS = ["Instagram", "TikTok", "LinkedIn", "X (Twitter)", "Facebook", "YouTube", "Threads"];

export const TOOLS: ToolConfig[] = [
  // Productivity
  {
    slug: "email-generator",
    name: "Email Generator",
    desc: "Draft polished emails in seconds.",
    icon: Mail,
    category: "productivity",
    tone: tones[0],
    system: "You write clear, well-structured professional emails. Output ONLY the email with a Subject line, then a blank line, then the body. No commentary.",
    fields: [
      { name: "recipient", label: "Recipient", type: "text", placeholder: "e.g. John, Marketing Director at Acme", required: true },
      { name: "tone", label: "Tone", type: "select", options: TONES, required: true },
      { name: "purpose", label: "Purpose", type: "text", placeholder: "e.g. Propose a partnership", required: true },
      { name: "context", label: "Additional Context", type: "textarea", placeholder: "Any background, key points, deadlines…" },
    ],
    buildPrompt: (v) =>
      `Write an email.\nRecipient: ${v.recipient}\nTone: ${v.tone}\nPurpose: ${v.purpose}\nContext: ${v.context || "None"}`,
  },
  {
    slug: "meeting-summarizer",
    name: "Meeting Summarizer",
    desc: "Turn notes into action items.",
    icon: ClipboardList,
    category: "productivity",
    tone: tones[1],
    system: "You convert raw meeting notes into a structured summary. Use markdown with sections: ## Summary, ## Key Points, ## Action Items (with owners if mentioned), ## Deadlines.",
    fields: [
      { name: "notes", label: "Meeting Notes", type: "textarea", placeholder: "Paste raw meeting notes or transcript…", required: true },
    ],
    buildPrompt: (v) => `Summarize these meeting notes:\n\n${v.notes}`,
  },
  {
    slug: "task-planner",
    name: "Task Planner",
    desc: "Build a structured schedule.",
    icon: ListChecks,
    category: "productivity",
    tone: tones[2],
    system: "You build realistic daily/weekly schedules. Output a markdown schedule with time blocks, prioritized tasks, and short notes.",
    fields: [
      { name: "tasks", label: "Tasks", type: "textarea", placeholder: "One task per line", required: true },
      { name: "priorities", label: "Priorities", type: "text", placeholder: "e.g. Launch campaign first, then research" },
      { name: "time", label: "Available Time", type: "text", placeholder: "e.g. 6 hours/day, Mon–Fri", required: true },
    ],
    buildPrompt: (v) =>
      `Plan a schedule.\nTasks:\n${v.tasks}\nPriorities: ${v.priorities || "Not specified"}\nAvailable Time: ${v.time}`,
  },
  {
    slug: "research-assistant",
    name: "Research Assistant",
    desc: "Summaries and insights on any topic.",
    icon: BookOpen,
    category: "productivity",
    tone: tones[3],
    system: "You are a research assistant. For the given topic, respond in markdown with: ## Summary, ## Key Insights (bulleted), ## Recommendations (bulleted, actionable).",
    fields: [
      { name: "topic", label: "Topic", type: "textarea", placeholder: "What do you want to research?", required: true },
    ],
    buildPrompt: (v) => `Research the following topic and produce summary, insights, and recommendations:\n\n${v.topic}`,
  },
  // Content
  {
    slug: "caption-generator",
    name: "Caption Generator",
    desc: "On-brand captions for any platform.",
    icon: MessageSquare,
    category: "content",
    tone: tones[4],
    system: "You write engaging social media captions tailored to platform best practices. Output 3 caption options, each numbered, with a short rationale below each.",
    fields: [
      { name: "platform", label: "Platform", type: "select", options: PLATFORMS, required: true },
      { name: "topic", label: "Topic", type: "textarea", placeholder: "What is the post about?", required: true },
      { name: "tone", label: "Tone", type: "select", options: TONES, required: true },
    ],
    buildPrompt: (v) =>
      `Generate 3 ${v.tone.toLowerCase()} captions for ${v.platform}.\nTopic: ${v.topic}`,
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    desc: "Reach the right audience faster.",
    icon: Hash,
    category: "content",
    tone: tones[5],
    system: "You generate effective hashtag sets. Output 3 groups: ## High-reach, ## Niche, ## Branded. 8–12 tags per group, comma-separated on one line.",
    fields: [
      { name: "topic", label: "Topic", type: "text", placeholder: "e.g. New product launch", required: true },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Fitness, SaaS, Beauty", required: true },
    ],
    buildPrompt: (v) => `Generate hashtags for topic "${v.topic}" in the ${v.industry} industry.`,
  },
  {
    slug: "content-ideas",
    name: "Content Ideas",
    desc: "Never stare at a blank page again.",
    icon: Lightbulb,
    category: "content",
    tone: tones[0],
    system: "You generate 10 fresh, specific content ideas. Output a numbered markdown list. Each idea includes a title and a one-sentence angle.",
    fields: [
      { name: "brand", label: "Brand", type: "text", placeholder: "e.g. Aero Coffee", required: true },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Specialty coffee", required: true },
    ],
    buildPrompt: (v) => `Generate 10 content ideas for the brand "${v.brand}" in the ${v.industry} industry.`,
  },
  {
    slug: "campaign-planner",
    name: "Campaign Planner",
    desc: "Map launches from idea to ship.",
    icon: Megaphone,
    category: "content",
    tone: tones[1],
    system: "You plan marketing campaigns. Output markdown with: ## Strategy, ## Channels, ## Timeline (week-by-week), ## Budget Allocation, ## KPIs.",
    fields: [
      { name: "goal", label: "Campaign Goal", type: "text", placeholder: "e.g. Drive 1,000 signups", required: true },
      { name: "audience", label: "Audience", type: "text", placeholder: "e.g. SMB owners, US", required: true },
      { name: "budget", label: "Budget", type: "text", placeholder: "e.g. $5,000", required: true },
    ],
    buildPrompt: (v) =>
      `Plan a campaign.\nGoal: ${v.goal}\nAudience: ${v.audience}\nBudget: ${v.budget}`,
  },
  {
    slug: "content-calendar",
    name: "Content Calendar",
    desc: "See the whole month at a glance.",
    icon: Calendar,
    category: "content",
    tone: tones[2],
    system: "You produce a 4-week content calendar as a markdown table with columns: Week, Day, Channel, Post Type, Topic/Caption Idea.",
    fields: [
      { name: "month", label: "Month", type: "text", placeholder: "e.g. November", required: true },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Real estate", required: true },
    ],
    buildPrompt: (v) => `Create a 4-week content calendar for ${v.month} in the ${v.industry} industry.`,
  },
  // Strategy
  {
    slug: "trend-analyzer",
    name: "Trend Analyzer",
    desc: "Spot what's rising before it peaks.",
    icon: TrendingUp,
    category: "strategy",
    tone: tones[3],
    system: "You analyze marketing/content trends for a topic. Output markdown: ## Emerging Trends, ## Why They Matter, ## How to Leverage Them.",
    fields: [
      { name: "topic", label: "Topic / Industry", type: "text", placeholder: "e.g. Short-form video for B2B", required: true },
    ],
    buildPrompt: (v) => `Analyze current trends for: ${v.topic}`,
  },
  {
    slug: "client-outreach",
    name: "Client Outreach",
    desc: "Personalized prospecting that lands.",
    icon: Send,
    category: "strategy",
    tone: tones[4],
    system: "You write client outreach. Output: ## Cold Email (subject + body), ## Follow-up Email, ## 1-paragraph Proposal Snippet.",
    fields: [
      { name: "client", label: "Prospect / Company", type: "text", placeholder: "e.g. Acme Inc., a DTC skincare brand", required: true },
      { name: "service", label: "Service You Offer", type: "text", placeholder: "e.g. Paid social management", required: true },
      { name: "angle", label: "Value Angle", type: "textarea", placeholder: "Why now? What insight do you have?" },
    ],
    buildPrompt: (v) =>
      `Write outreach.\nProspect: ${v.client}\nService: ${v.service}\nAngle: ${v.angle || "Generic"}`,
  },
];

export const STATIC_TOOLS = [
  { slug: "analytics-overview", name: "Analytics Overview", desc: "Performance you can act on.", icon: BarChart3, category: "strategy" as const, tone: tones[5] },
  { slug: "resource-library", name: "Resource Library", desc: "Templates, briefs and brand assets.", icon: Library, category: "strategy" as const, tone: tones[0] },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

export function allToolCards() {
  return [
    ...TOOLS.map((t) => ({ slug: t.slug, name: t.name, desc: t.desc, icon: t.icon, category: t.category, tone: t.tone })),
    ...STATIC_TOOLS,
  ];
}
