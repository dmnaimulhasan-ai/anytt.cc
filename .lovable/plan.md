
# Fix: Serve sitemap.xml with correct Content-Type

## Problem
The sitemap.xml at `https://anytt.cc/sitemap.xml` is being served as `text/html` instead of `application/xml`. The browser/Google interprets the XML as broken HTML, wrapping it in `<html><body>` tags. Google Search Console rejects it because it's not valid XML.

This happens because the `_headers` configuration isn't being applied correctly by the hosting platform, and the SPA fallback (`/* /index.html 200`) may be intercepting the request.

## Solution
Create a backend function that dynamically serves the sitemap with the correct `Content-Type: application/xml` header. Then update the `_redirects` to route `/sitemap.xml` to this function instead of relying on static file serving.

### Steps

1. **Create a `serve-sitemap` edge function** that:
   - Returns the full sitemap XML content
   - Sets `Content-Type: application/xml; charset=utf-8`
   - Sets appropriate cache headers (`Cache-Control: public, max-age=86400`)
   - Includes CORS headers for cross-origin access

2. **Update `public/_redirects`** to proxy `/sitemap.xml` requests to the edge function:
   - Replace the static `200!` rule with a proxy to the edge function URL
   - Keep the trailing-slash redirect (`/sitemap.xml/ -> /sitemap.xml 301!`)

3. **Also create a `serve-robots` edge function** as a preventive measure, since `robots.txt` could face the same Content-Type issue and it references the sitemap URL.

4. **Update `public/_redirects`** to proxy `/robots.txt` to the robots edge function as well.

### Technical Details

**Edge function: `supabase/functions/serve-sitemap/index.ts`**
- Reads the sitemap XML content (hardcoded or from a template)
- Returns with headers: `Content-Type: application/xml; charset=utf-8`

**Edge function: `supabase/functions/serve-robots/index.ts`**
- Returns robots.txt content with `Content-Type: text/plain; charset=utf-8`

**Updated `_redirects` rules:**
```text
/sitemap.xml/   /sitemap.xml    301!
/sitemap.xml    https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/serve-sitemap  200!
/robots.txt     https://gicmzzepxupzghcswqyd.supabase.co/functions/v1/serve-robots   200!
```

This ensures Google receives properly formatted XML/text with correct Content-Type headers, fixing the indexing issue.
