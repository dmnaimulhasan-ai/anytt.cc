import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://gicmzzepxupzghcswqyd.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY216emVweHVwemdoY3N3cXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDMxMDAsImV4cCI6MjA4MjAxOTEwMH0.IKH2-7_w4caevftwJ0VNVUAtFiBoOPM3kl6z4O8BjMM";

export default defineTool({
  name: "download_pinterest",
  title: "Download Pinterest video or image",
  description:
    "Get a direct download link for a Pinterest pin (video or image) in the highest quality available. Accepts pinterest.com pin URLs and pin.it short links.",
  inputSchema: {
    url: z
      .string()
      .url()
      .describe("The Pinterest pin URL (e.g. https://pin.it/xxxx or https://www.pinterest.com/pin/12345)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ url }) => {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/pinterest-download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ url }),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Pinterest download failed (${res.status}): ${text}` }],
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
