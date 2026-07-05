# Anytt.cc MCP Server

Connect AI assistants (ChatGPT, Claude, Cursor, Codex, Windsurf, etc.) to Anytt.cc so they can download TikTok and Pinterest media on your behalf.

- **Server URL:** `https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp`
- **Transport:** MCP Streamable HTTP (JSON-RPC 2.0 over POST)
- **Auth:** None — public tools, no API key required
- **Protocol version:** `2025-06-18`

## 1. Connect from an MCP client

### Claude Desktop / Cursor / Windsurf (`mcp.json`)

```json
{
  "mcpServers": {
    "anytt": {
      "url": "https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp"
    }
  }
}
```

### ChatGPT (Custom Connector)

1. Settings → **Connectors** → **Add custom connector**
2. Name: `Anytt.cc`
3. MCP Server URL: `https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp`
4. Authentication: **None**

### Raw HTTP client

Every request must send both `Content-Type` and `Accept`:

```
Content-Type: application/json
Accept: application/json, text/event-stream
```

Omitting `Accept: text/event-stream` returns HTTP 406.

## 2. Discover tools

```bash
curl -sS https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Returns three tools: `download_tiktok`, `download_pinterest`, `list_tiktok_profile_videos`.

## 3. Tools

All tools are called via JSON-RPC `tools/call`:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "name": "<tool_name>", "arguments": { /* ... */ } }
}
```

### `download_tiktok`

Returns direct download links for a TikTok video (no-watermark HD, plus MP3 audio). Accepts full URLs and `vt.tiktok.com` / `vm.tiktok.com` short links.

**Arguments**

| Field | Type   | Required | Description |
|-------|--------|----------|-------------|
| `url` | string | yes      | Any TikTok video URL. |

**Example**

```bash
curl -sS https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{
      "name":"download_tiktok",
      "arguments":{"url":"https://www.tiktok.com/@tiktok/video/7106594312292453675"}
    }
  }'
```

**Response (structuredContent)** includes `title`, `cover`, `play` (no-watermark video URL), `hdplay` (HD video URL), and `music` (MP3 audio URL).

### `download_pinterest`

Returns a direct download link for a Pinterest pin (video or image) in the highest quality available. Accepts `pinterest.com/pin/...` URLs and `pin.it/...` short links.

**Arguments**

| Field | Type   | Required | Description |
|-------|--------|----------|-------------|
| `url` | string | yes      | Any Pinterest pin URL. |

**Example**

```bash
curl -sS https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{
      "name":"download_pinterest",
      "arguments":{"url":"https://pin.it/abc123"}
    }
  }'
```

### `list_tiktok_profile_videos`

Fetches up to ~30 recent public videos for a TikTok profile — useful for batch downloading. Accepts a `@username`, a bare username, or a full profile URL.

**Arguments**

| Field      | Type   | Required | Description |
|------------|--------|----------|-------------|
| `username` | string | yes      | `@user`, `user`, or `https://www.tiktok.com/@user`. |

**Example**

```bash
curl -sS https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{
      "name":"list_tiktok_profile_videos",
      "arguments":{"username":"@tiktok"}
    }
  }'
```

Feed each returned video URL back into `download_tiktok` to get downloadable links.

## 4. Example assistant prompts

- "Download this TikTok without watermark: https://vt.tiktok.com/ZS…/"
- "Grab the MP3 audio from this TikTok: <url>"
- "Save this Pinterest pin in HD: https://pin.it/…"
- "Get the last 20 videos from @username and give me HD download links for each."

## 5. Errors

- **HTTP 406** — client didn't send `Accept: application/json, text/event-stream`.
- **Tool `isError: true`** — upstream TikTok/Pinterest fetch failed; the `content[0].text` field contains the reason (invalid URL, private post, region block, rate limit).
- **HTTP 429** — the underlying downloader is rate-limited; retry after a short wait.

## 6. Terms

Only download content you have the right to save. See <https://anytt.cc/terms-of-service> and <https://anytt.cc/dmca>.
