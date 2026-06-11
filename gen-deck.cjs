const PptxGenJS = require("pptxgenjs");
const p = new PptxGenJS();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
const W = 13.33, H = 7.5;

// Brand palette
const C = {
  red: "E63946",
  redDk: "B5202C",
  pink: "FFD6E0",
  pinkDk: "F49AB1",
  blue: "D6E8FF",
  blueDk: "8FB8F5",
  purple: "E4D9FF",
  purpleDk: "AF9DEB",
  yellow: "FFF1C2",
  yellowDk: "F1CE6B",
  green: "D4F1DE",
  greenDk: "8ED4A8",
  grey: "EEF0F3",
  greyDk: "B9BEC7",
  ink: "1A1A2A",
  inkSoft: "4B4B5C",
  white: "FFFFFF",
};

const FH = "Plus Jakarta Sans";
const FB = "Plus Jakarta Sans";

function bg(s, color) {
  s.background = { color };
}

function blob(s, x, y, w, h, color, opts = {}) {
  s.addShape("roundRect", { x, y, w, h, fill: { color }, line: { color, transparency: 100 }, rectRadius: opts.r ?? 0.35, ...opts });
}

function circle(s, x, y, d, color) {
  s.addShape("ellipse", { x, y, w: d, h: d, fill: { color }, line: { color, transparency: 100 } });
}

function footer(s, n) {
  s.addShape("roundRect", { x: 0.5, y: H - 0.55, w: 1.5, h: 0.35, fill: { color: C.white }, line: { color: C.ink, width: 0.75 }, rectRadius: 0.18 });
  s.addText("MarketMate AI", { x: 0.5, y: H - 0.55, w: 1.5, h: 0.35, fontFace: FB, fontSize: 9, bold: true, color: C.ink, align: "center", valign: "middle" });
  s.addText(`${n} / 8`, { x: W - 1.2, y: H - 0.55, w: 0.7, h: 0.35, fontFace: FB, fontSize: 9, bold: true, color: C.inkSoft, align: "right", valign: "middle" });
}

function kicker(s, text, x, y, color = C.red) {
  s.addText(text, { x, y, w: 6, h: 0.32, fontFace: FB, fontSize: 11, bold: true, color, charSpacing: 4 });
}

// === SLIDE 1: Cover ===
{
  const s = p.addSlide();
  bg(s, C.pink);
  // gradient-like overlap blobs
  s.addShape("ellipse", { x: -2, y: -2, w: 7, h: 7, fill: { color: C.purple }, line: { color: C.purple, transparency: 100 } });
  s.addShape("ellipse", { x: 7, y: -3, w: 8, h: 8, fill: { color: C.blue }, line: { color: C.blue, transparency: 100 } });
  s.addShape("ellipse", { x: 4, y: 4, w: 6, h: 6, fill: { color: C.pinkDk }, line: { color: C.pinkDk, transparency: 100 } });
  s.addShape("ellipse", { x: 9, y: 5, w: 4, h: 4, fill: { color: C.yellow }, line: { color: C.yellow, transparency: 100 } });
  // decorative shapes
  circle(s, 1.2, 5.5, 0.5, C.red);
  s.addShape("roundRect", { x: 11.5, y: 1.2, w: 0.7, h: 0.7, fill: { color: C.red }, line: { color: C.red, transparency: 100 }, rectRadius: 0.15, rotate: 20 });
  s.addShape("triangle", { x: 2, y: 1.5, w: 0.6, h: 0.6, fill: { color: C.greenDk }, line: { color: C.greenDk, transparency: 100 } });

  // Logo badge
  s.addShape("roundRect", { x: 0.7, y: 0.7, w: 2.5, h: 0.55, fill: { color: C.white }, line: { color: C.white, transparency: 100 }, rectRadius: 0.28 });
  s.addShape("ellipse", { x: 0.85, y: 0.83, w: 0.3, h: 0.3, fill: { color: C.red }, line: { color: C.red, transparency: 100 } });
  s.addText("MarketMate AI", { x: 1.2, y: 0.7, w: 2, h: 0.55, fontFace: FB, fontSize: 12, bold: true, color: C.ink, valign: "middle" });

  // Main card
  blob(s, 1.2, 2.3, 8.5, 3.9, C.white, { r: 0.4 });
  s.addText("✦ AI-POWERED MARKETING", { x: 1.7, y: 2.7, w: 6, h: 0.4, fontFace: FB, fontSize: 12, bold: true, color: C.red, charSpacing: 4 });
  s.addText("MarketMate AI", { x: 1.7, y: 3.15, w: 8, h: 1.4, fontFace: FH, fontSize: 64, bold: true, color: C.ink });
  s.addText("Your Marketing Workflow,\nPowered by AI.", { x: 1.7, y: 4.6, w: 7.5, h: 1.1, fontFace: FB, fontSize: 22, color: C.inkSoft });

  // Pills
  const pills = [["Brands", C.pink], ["Agencies", C.blue], ["Teams", C.purple], ["Creators", C.yellow]];
  let px = 1.7;
  pills.forEach(([t, c]) => {
    const w = 1.25;
    s.addShape("roundRect", { x: px, y: 5.8, w, h: 0.4, fill: { color: c }, line: { color: c, transparency: 100 }, rectRadius: 0.2 });
    s.addText(t, { x: px, y: 5.8, w, h: 0.4, fontFace: FB, fontSize: 10, bold: true, color: C.ink, align: "center", valign: "middle" });
    px += w + 0.15;
  });

  // Right-side illustration: stacked app cards
  blob(s, 10.1, 2.6, 2.6, 1.4, C.purple, { r: 0.3 });
  s.addText("\u25C9", { x: 10.2, y: 2.7, w: 0.7, h: 0.7, fontSize: 28 });
  s.addText("AI Assistant", { x: 10.9, y: 2.75, w: 1.7, h: 0.3, fontFace: FB, fontSize: 11, bold: true, color: C.ink });
  s.addText("Always on", { x: 10.9, y: 3.05, w: 1.7, h: 0.3, fontFace: FB, fontSize: 9, color: C.inkSoft });
  blob(s, 10.1, 3.45, 2.6, 0.5, C.white, { r: 0.2 });
  blob(s, 10.2, 3.55, 1.6, 0.3, C.pinkDk, { r: 0.15 });

  blob(s, 10.1, 4.2, 2.6, 1.4, C.yellow, { r: 0.3 });
  s.addText("\u25A4", { x: 10.2, y: 4.3, w: 0.7, h: 0.7, fontSize: 26 });
  s.addText("Content Calendar", { x: 10.9, y: 4.35, w: 1.7, h: 0.3, fontFace: FB, fontSize: 11, bold: true, color: C.ink });
  s.addText("12 scheduled", { x: 10.9, y: 4.65, w: 1.7, h: 0.3, fontFace: FB, fontSize: 9, color: C.inkSoft });
  for (let i = 0; i < 4; i++) blob(s, 10.2 + i * 0.6, 5.05, 0.5, 0.45, C.white, { r: 0.1 });

  blob(s, 10.1, 5.8, 2.6, 0.95, C.green, { r: 0.3 });
  s.addText("✓ Goal hit  87%", { x: 10.25, y: 5.8, w: 2.4, h: 0.95, fontFace: FB, fontSize: 14, bold: true, color: C.ink, valign: "middle" });

  s.addText("CAPACITI Project • 2026", { x: 0.7, y: H - 0.55, w: 5, h: 0.35, fontFace: FB, fontSize: 10, color: C.inkSoft, valign: "middle" });
}

// === SLIDE 2: Problem (Soft Pink) ===
{
  const s = p.addSlide();
  bg(s, C.pink);
  circle(s, 11, -1.5, 4, C.pinkDk);
  circle(s, -1.5, 5, 3.5, C.white);

  kicker(s, "THE PROBLEM", 0.7, 0.7);
  s.addText("Marketing teams are\ndrowning in busywork.", { x: 0.7, y: 1.1, w: 10, h: 1.8, fontFace: FH, fontSize: 44, bold: true, color: C.ink });

  const items = [
    { icon: "\u29D6", t: "60% of time lost", d: "Repetitive admin tasks eat the workday.", c: C.white },
    { icon: "\u270E", t: "Blank page paralysis", d: "Captions, emails, briefs — stuck at the start.", c: C.yellow },
    { icon: "\u25A4", t: "Scattered workflows", d: "Calendars, clients and content live in 7 tabs.", c: C.blue },
  ];
  items.forEach((it, i) => {
    const x = 0.7 + i * 4.1;
    blob(s, x, 3.5, 3.85, 3.3, it.c, { r: 0.3 });
    blob(s, x + 0.35, 3.85, 0.9, 0.9, C.red, { r: 0.25 });
    s.addText(it.icon, { x: x + 0.35, y: 3.85, w: 0.9, h: 0.9, fontSize: 28, align: "center", valign: "middle" });
    s.addText(it.t, { x: x + 0.35, y: 4.95, w: 3.2, h: 0.5, fontFace: FH, fontSize: 19, bold: true, color: C.ink });
    s.addText(it.d, { x: x + 0.35, y: 5.5, w: 3.2, h: 1.1, fontFace: FB, fontSize: 13, color: C.inkSoft });
  });
  footer(s, 2);
}

// === SLIDE 3: Solution (Soft Blue) ===
{
  const s = p.addSlide();
  bg(s, C.blue);
  circle(s, -2, -2, 5, C.blueDk);
  circle(s, 12, 6, 3, C.purple);

  kicker(s, "THE SOLUTION", 0.7, 0.7);
  s.addText("One AI workspace for\nyour entire marketing motion.", { x: 0.7, y: 1.1, w: 12, h: 1.8, fontFace: FH, fontSize: 40, bold: true, color: C.ink });

  // Big hero card
  blob(s, 0.7, 3.2, 6.5, 3.5, C.white, { r: 0.35 });
  s.addText("✦", { x: 0.95, y: 3.45, w: 0.6, h: 0.6, fontSize: 28, color: C.red });
  s.addText("Generate. Plan. Ship.", { x: 0.95, y: 4.05, w: 6, h: 0.7, fontFace: FH, fontSize: 28, bold: true, color: C.ink });
  s.addText("MarketMate AI combines productivity, content and strategy tools in one beautifully simple workspace — so teams can spend more time creating and less time juggling.", { x: 0.95, y: 4.85, w: 6, h: 1.7, fontFace: FB, fontSize: 14, color: C.inkSoft });

  const bs = [
    { t: "11+", l: "AI tools", c: C.pink },
    { t: "3x", l: "Faster output", c: C.yellow },
    { t: "1", l: "Unified hub", c: C.green },
    { t: "24/7", l: "AI Assistant", c: C.purple },
  ];
  bs.forEach((b, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 7.5 + col * 2.8, y = 3.2 + row * 1.8;
    blob(s, x, y, 2.6, 1.6, b.c, { r: 0.3 });
    s.addText(b.t, { x, y: y + 0.15, w: 2.6, h: 0.7, fontFace: FH, fontSize: 32, bold: true, color: C.ink, align: "center" });
    s.addText(b.l, { x, y: y + 0.95, w: 2.6, h: 0.5, fontFace: FB, fontSize: 12, bold: true, color: C.inkSoft, align: "center" });
  });
  footer(s, 3);
}

// === SLIDE 4: Productivity Tools (Soft Purple) ===
{
  const s = p.addSlide();
  bg(s, C.purple);
  circle(s, 11.5, -1.5, 4, C.purpleDk);
  circle(s, -1, 6, 3, C.pink);

  kicker(s, "PRODUCTIVITY TOOLS", 0.7, 0.7);
  s.addText("Move faster on the\nwork that matters.", { x: 0.7, y: 1.1, w: 11, h: 1.8, fontFace: FH, fontSize: 40, bold: true, color: C.ink });

  const tools = [
    { icon: "\u2709", t: "Email Generator", d: "Polished emails in seconds.", c: C.pink },
    { icon: "\u270E", t: "Meeting Summarizer", d: "Notes into clean action items.", c: C.blue },
    { icon: "\u25A4", t: "Task Planner", d: "Structured daily schedules.", c: C.yellow },
    { icon: "\u26B2", t: "Research Assistant", d: "Insights on any topic, fast.", c: C.green },
  ];
  tools.forEach((t, i) => {
    const x = 0.7 + i * 3.1;
    blob(s, x, 3.3, 2.9, 3.5, t.c, { r: 0.35 });
    blob(s, x + 0.3, 3.6, 1.1, 1.1, C.white, { r: 0.3 });
    s.addText(t.icon, { x: x + 0.3, y: 3.6, w: 1.1, h: 1.1, fontSize: 36, align: "center", valign: "middle" });
    s.addText(t.t, { x: x + 0.3, y: 4.95, w: 2.4, h: 0.5, fontFace: FH, fontSize: 17, bold: true, color: C.ink });
    s.addText(t.d, { x: x + 0.3, y: 5.5, w: 2.4, h: 1, fontFace: FB, fontSize: 12, color: C.inkSoft });
  });
  footer(s, 4);
}

// === SLIDE 5: Content Tools (Soft Yellow) ===
{
  const s = p.addSlide();
  bg(s, C.yellow);
  circle(s, -2, -1, 4, C.yellowDk);
  circle(s, 12, 5.5, 3.5, C.pink);

  kicker(s, "CONTENT TOOLS", 0.7, 0.7);
  s.addText("From caption to calendar\nin a single flow.", { x: 0.7, y: 1.1, w: 11, h: 1.8, fontFace: FH, fontSize: 40, bold: true, color: C.ink });

  const tiles = [
    { icon: "\u275D", t: "Caption Generator", c: C.pink },
    { icon: "#", t: "Hashtag Generator", c: C.blue },
    { icon: "\u2600", t: "Content Ideas", c: C.purple },
    { icon: "\u25C8", t: "Campaign Planner", c: C.green },
    { icon: "\u29C9", t: "Content Calendar", c: C.white },
  ];
  // 5 tiles in a row
  tiles.forEach((t, i) => {
    const x = 0.7 + i * 2.45;
    blob(s, x, 3.3, 2.3, 2.3, t.c, { r: 0.35 });
    s.addText(t.icon, { x, y: 3.5, w: 2.3, h: 1.2, fontSize: 44, align: "center" });
    s.addText(t.t, { x: x + 0.1, y: 4.75, w: 2.1, h: 0.7, fontFace: FH, fontSize: 13, bold: true, color: C.ink, align: "center" });
  });

  // Bottom strip - sample post mockup
  blob(s, 0.7, 5.9, 12, 0.9, C.white, { r: 0.25 });
  s.addText("❝", { x: 0.85, y: 5.85, w: 0.6, h: 0.9, fontSize: 32, color: C.red, bold: true });
  s.addText("Drop a topic — get on-brand captions, smart hashtags and a month of post ideas in seconds.", { x: 1.5, y: 5.9, w: 11, h: 0.9, fontFace: FB, fontSize: 13, color: C.ink, valign: "middle", italic: false });
  footer(s, 5);
}

// === SLIDE 6: Platform Features (Soft Green) ===
{
  const s = p.addSlide();
  bg(s, C.green);
  circle(s, -1.5, 6, 3, C.greenDk);
  circle(s, 12, -1, 3, C.blue);

  kicker(s, "PLATFORM FEATURES", 0.7, 0.7);
  s.addText("Everything connected\nin one workspace.", { x: 0.7, y: 1.1, w: 11, h: 1.8, fontFace: FH, fontSize: 40, bold: true, color: C.ink });

  // Mock dashboard
  blob(s, 0.7, 3.2, 7.5, 3.7, C.white, { r: 0.3 });
  // sidebar
  blob(s, 0.95, 3.45, 1.7, 3.2, C.pink, { r: 0.2 });
  const nav = ["⌂ Dashboard", "✦ AI Assistant", "▤ Projects", "▦ Calendar", "☺ Clients", "▥ Reports"];
  nav.forEach((n, i) => {
    s.addText(n, { x: 1.05, y: 3.6 + i * 0.5, w: 1.5, h: 0.4, fontFace: FB, fontSize: 10, bold: i === 1, color: C.ink, valign: "middle" });
  });
  // main area cards
  blob(s, 2.85, 3.5, 5.2, 1.4, C.blue, { r: 0.2 });
  s.addText("Welcome back", { x: 3, y: 3.55, w: 4, h: 0.35, fontFace: FB, fontSize: 10, bold: true, color: C.inkSoft });
  s.addText("Let's ship today.", { x: 3, y: 3.9, w: 5, h: 0.8, fontFace: FH, fontSize: 22, bold: true, color: C.ink });
  blob(s, 2.85, 5.05, 1.65, 1.6, C.yellow, { r: 0.2 });
  s.addText("12", { x: 2.85, y: 5.15, w: 1.65, h: 0.7, fontFace: FH, fontSize: 28, bold: true, color: C.ink, align: "center" });
  s.addText("Scheduled", { x: 2.85, y: 5.85, w: 1.65, h: 0.4, fontFace: FB, fontSize: 10, color: C.inkSoft, align: "center" });
  blob(s, 4.6, 5.05, 1.65, 1.6, C.purple, { r: 0.2 });
  s.addText("3", { x: 4.6, y: 5.15, w: 1.65, h: 0.7, fontFace: FH, fontSize: 28, bold: true, color: C.ink, align: "center" });
  s.addText("In review", { x: 4.6, y: 5.85, w: 1.65, h: 0.4, fontFace: FB, fontSize: 10, color: C.inkSoft, align: "center" });
  blob(s, 6.35, 5.05, 1.7, 1.6, C.green, { r: 0.2 });
  s.addText("87%", { x: 6.35, y: 5.15, w: 1.7, h: 0.7, fontFace: FH, fontSize: 28, bold: true, color: C.ink, align: "center" });
  s.addText("Goal hit", { x: 6.35, y: 5.85, w: 1.7, h: 0.4, fontFace: FB, fontSize: 10, color: C.inkSoft, align: "center" });

  // Right column features
  const fs = [
    { icon: "✦", t: "AI Assistant", c: C.purple },
    { icon: "▤", t: "Projects", c: C.pink },
    { icon: "▥", t: "Reports", c: C.blue },
    { icon: "▦", t: "Calendar", c: C.yellow },
    { icon: "☺", t: "Clients", c: C.white },
  ];
  fs.forEach((f, i) => {
    const y = 3.2 + i * 0.74;
    blob(s, 8.5, y, 4.2, 0.6, f.c, { r: 0.2 });
    blob(s, 8.6, y + 0.08, 0.45, 0.45, C.red, { r: 0.12 });
    s.addText(f.icon, { x: 8.6, y: y + 0.08, w: 0.45, h: 0.45, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle" });
    s.addText(f.t, { x: 9.2, y, w: 3, h: 0.6, fontFace: FB, fontSize: 13, bold: true, color: C.ink, valign: "middle" });
  });
  footer(s, 6);
}

// === SLIDE 7: Responsible AI (Soft Grey) ===
{
  const s = p.addSlide();
  bg(s, C.grey);
  circle(s, 12, -1, 3.5, C.purple);
  circle(s, -2, 5, 4, C.pink);

  kicker(s, "RESPONSIBLE AI", 0.7, 0.7);
  s.addText("AI works best\nwith you.", { x: 0.7, y: 1.1, w: 10, h: 1.8, fontFace: FH, fontSize: 44, bold: true, color: C.ink });

  const items = [
    { icon: "✓", t: "Verify information", d: "Cross-check AI output before publishing.", c: C.pink },
    { icon: "\u25C9", t: "Review outputs", d: "Read every draft with a critical eye.", c: C.blue },
    { icon: "\u2698", t: "Human oversight", d: "People stay in charge of decisions.", c: C.yellow },
    { icon: "\u2696", t: "Ethical AI use", d: "Honest, inclusive, on-brand always.", c: C.green },
  ];
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.7 + col * 6.1, y = 3.2 + row * 1.85;
    blob(s, x, y, 5.85, 1.65, C.white, { r: 0.25 });
    blob(s, x + 0.25, y + 0.3, 1.05, 1.05, it.c, { r: 0.25 });
    s.addText(it.icon, { x: x + 0.25, y: y + 0.3, w: 1.05, h: 1.05, fontSize: 30, align: "center", valign: "middle", bold: true, color: C.red });
    s.addText(it.t, { x: x + 1.5, y: y + 0.25, w: 4.2, h: 0.5, fontFace: FH, fontSize: 18, bold: true, color: C.ink });
    s.addText(it.d, { x: x + 1.5, y: y + 0.8, w: 4.2, h: 0.8, fontFace: FB, fontSize: 12, color: C.inkSoft });
  });
  footer(s, 7);
}

// === SLIDE 8: Conclusion (Gradient via blobs) ===
{
  const s = p.addSlide();
  bg(s, C.pink);
  s.addShape("ellipse", { x: -3, y: -3, w: 10, h: 10, fill: { color: C.purple }, line: { color: C.purple, transparency: 100 } });
  s.addShape("ellipse", { x: 6, y: -2, w: 9, h: 9, fill: { color: C.blue }, line: { color: C.blue, transparency: 100 } });
  s.addShape("ellipse", { x: 3, y: 4, w: 8, h: 8, fill: { color: C.pinkDk }, line: { color: C.pinkDk, transparency: 100 } });
  s.addShape("ellipse", { x: 9, y: 4, w: 5, h: 5, fill: { color: C.yellow }, line: { color: C.yellow, transparency: 100 } });

  // Decorative
  circle(s, 1, 1, 0.4, C.red);
  s.addShape("triangle", { x: 11.8, y: 5.8, w: 0.7, h: 0.7, fill: { color: C.red }, line: { color: C.red, transparency: 100 } });
  s.addShape("roundRect", { x: 2, y: 6, w: 0.5, h: 0.5, fill: { color: C.greenDk }, line: { color: C.greenDk, transparency: 100 }, rectRadius: 0.1, rotate: 25 });

  // Impact strip
  blob(s, 0.8, 0.6, 11.7, 1.6, C.white, { r: 0.3 });
  kicker(s, "PROJECT IMPACT", 1.1, 0.85);
  const stats = [["3×", "Faster output"], ["↑", "Productivity"], ["↓", "Repetitive work"], ["1", "Unified hub"]];
  stats.forEach(([n, l], i) => {
    const x = 1.1 + i * 2.85;
    s.addText(n, { x, y: 1.2, w: 2.7, h: 0.6, fontFace: FH, fontSize: 28, bold: true, color: C.red });
    s.addText(l, { x, y: 1.75, w: 2.7, h: 0.35, fontFace: FB, fontSize: 11, bold: true, color: C.inkSoft });
  });

  // Center card
  blob(s, 2.5, 2.8, 8.3, 4, C.white, { r: 0.4 });
  s.addText("✦", { x: 2.5, y: 3.05, w: 8.3, h: 0.6, fontSize: 26, color: C.red, align: "center" });
  s.addText("Thank You", { x: 2.5, y: 3.6, w: 8.3, h: 1.4, fontFace: FH, fontSize: 76, bold: true, color: C.ink, align: "center" });
  s.addText("Questions?", { x: 2.5, y: 5.05, w: 8.3, h: 0.7, fontFace: FH, fontSize: 28, color: C.red, align: "center", italic: false });

  const tags = [["Brands", C.pink], ["Agencies", C.blue], ["Teams", C.purple], ["Creators", C.yellow]];
  let tx = 4.1;
  tags.forEach(([t, c]) => {
    s.addShape("roundRect", { x: tx, y: 5.95, w: 1.25, h: 0.45, fill: { color: c }, line: { color: c, transparency: 100 }, rectRadius: 0.22 });
    s.addText(t, { x: tx, y: 5.95, w: 1.25, h: 0.45, fontFace: FB, fontSize: 10, bold: true, color: C.ink, align: "center", valign: "middle" });
    tx += 1.35;
  });
}

p.writeFile({ fileName: "/mnt/documents/MarketMate-AI-Deck.pptx" }).then((f) => console.log("Wrote", f));
