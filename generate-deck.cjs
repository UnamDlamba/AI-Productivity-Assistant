const PptxGenJS = require("pptxgenjs");
const fs = require("fs");

const RED = "E63946";
const BLACK = "1A1A1A";
const WHITE = "FFFFFF";
const GREY = "6B7280";
const LIGHT_GREY = "F3F4F6";
const SOFT_PINK = "FCE7EB";
const SOFT_BLUE = "E0F2FE";
const DARK_BG = "111827";

const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "MarketMate AI";
pres.title = "MarketMate AI — Presentation Deck";
pres.subject = "Marketing productivity powered by AI";

function makeShadow() {
  return { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 };
}

function addRedAccentBar(slide, y, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 0.06, h, fill: { color: RED }, line: { style: "none" },
  });
}

function footer(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.25, w: 9, h: 0.3,
    fontSize: 10, color: GREY, fontFace: "Arial",
  });
}

function kicker(slide, text, y) {
  slide.addText(text, {
    x: 0.7, y, w: 8, h: 0.35,
    fontSize: 13, color: RED, fontFace: "Arial", bold: true, charSpacing: 2,
  });
}

// ========== SLIDE 1: COVER ==========
let s1 = pres.addSlide();
s1.background = { color: DARK_BG };

s1.addText("MarketMate AI", {
  x: 0.5, y: 1.6, w: 9, h: 0.9,
  fontSize: 56, fontFace: "Arial", bold: true, color: WHITE, align: "center",
});

s1.addText("Your marketing workflow, powered by AI.", {
  x: 0.5, y: 2.6, w: 9, h: 0.5,
  fontSize: 24, fontFace: "Arial", color: "9CA3AF", align: "center",
});

s1.addShape(pres.shapes.RECTANGLE, {
  x: 4.25, y: 3.4, w: 1.5, h: 0.06, fill: { color: RED }, line: { style: "none" },
});

s1.addText("Modern Marketing \u00B7 Productivity \u00B7 AI-Powered", {
  x: 0.5, y: 3.7, w: 9, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: "6B7280", align: "center",
});

// ========== SLIDE 2: THE PROBLEM ==========
let s2 = pres.addSlide();
s2.background = { color: WHITE };
addRedAccentBar(s2, 0.9, 1.0);
kicker(s2, "THE CHALLENGE", 0.5);

s2.addText("Marketing teams lose 60% of their time to repetitive admin tasks.", {
  x: 0.9, y: 0.9, w: 8.5, h: 1.0,
  fontSize: 32, fontFace: "Arial", bold: true, color: BLACK,
});

s2.addText([
  { text: "Writing similar emails over and over", options: { bullet: true, breakLine: true } },
  { text: "Manually scheduling content across platforms", options: { bullet: true, breakLine: true } },
  { text: "Scrambling for campaign ideas under pressure", options: { bullet: true, breakLine: true } },
  { text: "Searching for relevant hashtags and trends", options: { bullet: true, breakLine: true } },
  { text: "Losing track of deadlines and client feedback", options: { bullet: true } },
], {
  x: 0.9, y: 2.1, w: 8.5, h: 2.5,
  fontSize: 20, fontFace: "Arial", color: "374151",
});

s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.9, y: 4.6, w: 8.5, h: 0.7, fill: { color: SOFT_PINK }, line: { style: "none" }, rectRadius: 0.1,
});
s2.addText("\u26A0  Time spent on admin is time not spent on strategy, creativity, or growth.", {
  x: 1.1, y: 4.65, w: 8.1, h: 0.6,
  fontSize: 16, fontFace: "Arial", bold: true, color: "9B2C2C", valign: "middle",
});

footer(s2, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 3: THE SOLUTION ==========
let s3 = pres.addSlide();
s3.background = { color: WHITE };
addRedAccentBar(s3, 0.9, 1.0);
kicker(s3, "THE SOLUTION", 0.5);

s3.addText("Automate the repetitive. Organize the chaos. Create with confidence.", {
  x: 0.9, y: 0.9, w: 8.5, h: 1.0,
  fontSize: 32, fontFace: "Arial", bold: true, color: BLACK,
});

s3.addText([
  { text: "AI-powered content generation for every channel", options: { bullet: true, breakLine: true } },
  { text: "Smart scheduling and calendar management", options: { bullet: true, breakLine: true } },
  { text: "Centralized workspace for teams and clients", options: { bullet: true, breakLine: true } },
  { text: "Human-in-the-loop review for quality control", options: { bullet: true } },
], {
  x: 0.9, y: 2.1, w: 8.5, h: 2.0,
  fontSize: 20, fontFace: "Arial", color: "374151",
});

s3.addShape(pres.shapes.RECTANGLE, {
  x: 0.9, y: 4.1, w: 8.5, h: 0.7, fill: { color: SOFT_BLUE }, line: { style: "none" }, rectRadius: 0.1,
});
s3.addText("\u2713  MarketMate AI combines creativity, organization, and automation in one platform.", {
  x: 1.1, y: 4.15, w: 8.1, h: 0.6,
  fontSize: 16, fontFace: "Arial", bold: true, color: "1E3A5F", valign: "middle",
});

footer(s3, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 4: PRODUCTIVITY TOOLS ==========
let s4 = pres.addSlide();
s4.background = { color: WHITE };
addRedAccentBar(s4, 0.5, 0.5);
kicker(s4, "PRODUCTIVITY TOOLS", 0.5);

s4.addText("Work faster with intelligent automation.", {
  x: 0.9, y: 0.9, w: 8.5, h: 0.5,
  fontSize: 28, fontFace: "Arial", bold: true, color: BLACK,
});

const cardW = 4.2;
const cardH = 1.8;
const gap = 0.3;
const startX = 0.5;
const startY = 1.6;

const prodCards = [
  { t: "Email Generator", d: "Draft professional outreach and follow-up emails instantly." },
  { t: "Meeting Summarizer", d: "Turn long meetings into actionable summaries and next steps." },
  { t: "Campaign Planner", d: "Build structured marketing campaigns from goal to execution." },
  { t: "Trend Research", d: "Discover what your audience is talking about right now." },
];

prodCards.forEach((c, i) => {
  const cx = startX + (i % 2) * (cardW + gap);
  const cy = startY + Math.floor(i / 2) * (cardH + gap);
  s4.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: cardW, h: cardH,
    fill: { color: WHITE },
    line: { color: "E5E7EB", width: 1 },
    shadow: makeShadow(), rectRadius: 0.08,
  });
  s4.addText(c.t, {
    x: cx + 0.2, y: cy + 0.15, w: cardW - 0.4, h: 0.4,
    fontSize: 18, fontFace: "Arial", bold: true, color: BLACK,
  });
  s4.addText(c.d, {
    x: cx + 0.2, y: cy + 0.55, w: cardW - 0.4, h: 0.9,
    fontSize: 14, fontFace: "Arial", color: GREY,
  });
});

footer(s4, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 5: CONTENT TOOLS ==========
let s5 = pres.addSlide();
s5.background = { color: WHITE };
addRedAccentBar(s5, 0.5, 0.5);
kicker(s5, "CONTENT TOOLS", 0.5);

s5.addText("Create content that connects and converts.", {
  x: 0.9, y: 0.9, w: 8.5, h: 0.5,
  fontSize: 28, fontFace: "Arial", bold: true, color: BLACK,
});

const contentCards = [
  { t: "Caption Generator", d: "On-brand captions tailored for every social platform." },
  { t: "Hashtag Generator", d: "Smart, niche-aware tags that expand your reach." },
  { t: "Content Ideas", d: "Endless creative ideas tuned to your audience." },
  { t: "Content Calendar", d: "Plan and schedule a month of posts in one afternoon." },
];

contentCards.forEach((c, i) => {
  const cx = startX + (i % 2) * (cardW + gap);
  const cy = startY + Math.floor(i / 2) * (cardH + gap);
  s5.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: cardW, h: cardH,
    fill: { color: WHITE },
    line: { color: "E5E7EB", width: 1 },
    shadow: makeShadow(), rectRadius: 0.08,
  });
  s5.addText(c.t, {
    x: cx + 0.2, y: cy + 0.15, w: cardW - 0.4, h: 0.4,
    fontSize: 18, fontFace: "Arial", bold: true, color: BLACK,
  });
  s5.addText(c.d, {
    x: cx + 0.2, y: cy + 0.55, w: cardW - 0.4, h: 0.9,
    fontSize: 14, fontFace: "Arial", color: GREY,
  });
});

footer(s5, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 6: PLATFORM FEATURES ==========
let s6 = pres.addSlide();
s6.background = { color: WHITE };
addRedAccentBar(s6, 0.9, 1.0);
kicker(s6, "PLATFORM OVERVIEW", 0.5);

s6.addText("Everything you need, in one calm workspace.", {
  x: 0.9, y: 0.9, w: 8.5, h: 0.6,
  fontSize: 30, fontFace: "Arial", bold: true, color: BLACK,
});

const featuresLeft = [
  "Dashboard with smart tiles",
  "Sidebar navigation for quick access",
  "AI Assistant for real-time help",
  "Project and client management",
];

const featuresRight = [
  "Calendar with month navigation",
  "Analytics and reporting tools",
  "Settings and team preferences",
  "Responsive, modern UI design",
];

s6.addText(featuresLeft.map(t => ({ text: t, options: { bullet: true, breakLine: true } })), {
  x: 0.9, y: 1.8, w: 4.0, h: 2.0,
  fontSize: 18, fontFace: "Arial", color: "374151",
});

s6.addText(featuresRight.map(t => ({ text: t, options: { bullet: true, breakLine: true } })), {
  x: 5.3, y: 1.8, w: 4.0, h: 2.0,
  fontSize: 18, fontFace: "Arial", color: "374151",
});

s6.addShape(pres.shapes.RECTANGLE, {
  x: 0.9, y: 4.0, w: 8.5, h: 0.7, fill: { color: LIGHT_GREY }, line: { style: "none" }, rectRadius: 0.1,
});
s6.addText("Designed for marketing agencies, social media managers, brands, and creators.", {
  x: 1.1, y: 4.05, w: 8.1, h: 0.6,
  fontSize: 16, fontFace: "Arial", bold: true, color: "374151", valign: "middle",
});

footer(s6, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 7: RESPONSIBLE AI ==========
let s7 = pres.addSlide();
s7.background = { color: WHITE };
addRedAccentBar(s7, 0.9, 1.0);
kicker(s7, "RESPONSIBLE AI", 0.5);

s7.addText("AI works best with human judgment.", {
  x: 0.9, y: 0.9, w: 8.5, h: 0.6,
  fontSize: 30, fontFace: "Arial", bold: true, color: BLACK,
});

s7.addText([
  { text: "AI-generated content may contain inaccuracies.", options: { bullet: true, breakLine: true } },
  { text: "Users should always review and verify outputs before use.", options: { bullet: true, breakLine: true } },
  { text: "MarketMate empowers creativity, but does not replace human oversight.", options: { bullet: true } },
], {
  x: 0.9, y: 1.8, w: 8.5, h: 1.5,
  fontSize: 20, fontFace: "Arial", color: "374151",
});

s7.addShape(pres.shapes.RECTANGLE, {
  x: 0.9, y: 3.5, w: 8.5, h: 0.7, fill: { color: SOFT_PINK }, line: { style: "none" }, rectRadius: 0.1,
});
s7.addText("\u26A0  Always review, edit, and verify AI-generated content before publishing.", {
  x: 1.1, y: 3.55, w: 8.1, h: 0.6,
  fontSize: 16, fontFace: "Arial", bold: true, color: "9B2C2C", valign: "middle",
});

footer(s7, "MarketMate AI \u00B7 Confidential");

// ========== SLIDE 8: IMPACT & CONCLUSION ==========
let s8 = pres.addSlide();
s8.background = { color: DARK_BG };

s8.addText("Project Impact", {
  x: 0.5, y: 0.8, w: 9, h: 0.6,
  fontSize: 40, fontFace: "Arial", bold: true, color: WHITE, align: "center",
});

s8.addShape(pres.shapes.RECTANGLE, {
  x: 4.25, y: 1.55, w: 1.5, h: 0.06, fill: { color: RED }, line: { style: "none" },
});

const stats = [
  { n: "3x", l: "Faster content creation" },
  { n: "60%", l: "Less repetitive work" },
  { n: "88%", l: "Faster campaign delivery" },
];

stats.forEach((s, i) => {
  const sx = 1.2 + i * 2.8;
  s8.addText(s.n, {
    x: sx, y: 2.0, w: 2.4, h: 0.7,
    fontSize: 48, fontFace: "Arial", bold: true, color: RED, align: "center",
  });
  s8.addText(s.l, {
    x: sx, y: 2.7, w: 2.4, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: "9CA3AF", align: "center",
  });
});

s8.addText("MarketMate AI transforms how marketing teams work \u2014 from scattered tasks to streamlined success.", {
  x: 0.5, y: 3.5, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: "D1D5DB", align: "center",
});

s8.addText("Thank You", {
  x: 0.5, y: 4.3, w: 9, h: 0.5,
  fontSize: 32, fontFace: "Arial", bold: true, color: WHITE, align: "center",
});

s8.addText("Questions?", {
  x: 0.5, y: 4.85, w: 9, h: 0.3,
  fontSize: 18, fontFace: "Arial", color: "9CA3AF", align: "center",
});

// Save
const outPath = "/mnt/documents/MarketMate-AI-Deck.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("Saved to " + outPath))
  .catch(err => { console.error(err); process.exit(1); });
