import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  system: z.string().min(1).max(2000),
  prompt: z.string().min(1).max(8000),
});

export const generateContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const { generateText } = await import("ai");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    try {
      const { text } = await generateText({
        model,
        system: data.system,
        prompt: data.prompt,
      });
      return { text };
    } catch (err: unknown) {
      const e = err as { status?: number; message?: string };
      if (e?.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
      if (e?.status === 402) throw new Error("AI credits exhausted. Please add credits in your workspace.");
      throw new Error(e?.message || "AI generation failed");
    }
  });
