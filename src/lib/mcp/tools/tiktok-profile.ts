import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://gicmzzepxupzghcswqyd.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY216emVweHVwemdoY3N3cXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDMxMDAsImV4cCI6MjA4MjAxOTEwMH0.IKH2-7_w4caevftwJ0VNVUAtFiBoOPM3kl6z4O8BjMM";

export default defineTool({
  name: "list_tiktok_profile_videos",
  title: "List TikTok profile videos",
  description:
    "Fetch a list of recent public videos for a TikTok profile (up to ~30). Useful for batch downloading. Accepts a @username or a full profile URL.",
  inputSchema: {
    username: z
      .string()
      .min(1)
      .describe("TikTok username (with or without @), or a full profile URL like https://www.tiktok.com/@user."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ username }) => {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/tiktok-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ username }),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Profile fetch failed (${res.status}): ${text}` }],
        isError: true,
      };
    }
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return { content: [{ type: "text", text }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
