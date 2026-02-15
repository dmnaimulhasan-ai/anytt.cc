

# Fix Sitemap "Could Not Be Read" Issue

## Root Cause
The `_redirects` file contains invalid Netlify syntax. Lines like:
```
/sitemap.xml    /sitemap.xml    200!  Content-Type=application/xml
```
are not valid — Netlify `_redirects` does NOT support inline header parameters. This likely causes the redirect rule to be ignored entirely, so the SPA fallback (`/* /index.html 200`) catches `/sitemap.xml` and serves your React app's HTML instead of the XML file.

The `_headers` file already correctly sets `Content-Type: application/xml` for `/sitemap.xml`, so we just need to fix the redirect syntax.

## Changes

### 1. Fix `public/_redirects` — Remove invalid header params
Revert to clean redirect syntax (the `!` force flag is all that's needed to bypass SPA fallback):

```
/sitemap.xml    /sitemap.xml    200!
/robots.txt     /robots.txt     200!
```

### 2. Verify `public/_headers` already handles Content-Type
The `_headers` file already has correct entries:
```
/sitemap.xml
  Content-Type: application/xml
/robots.txt
  Content-Type: text/plain
```
No changes needed here.

---

## Files Modified (1)

| File | Change |
|------|--------|
| `public/_redirects` | Remove invalid `Content-Type=...` params from sitemap and robots rules |

## Verification
After publishing, visit `https://anytt.cc/sitemap.xml` directly — it should return raw XML, not HTML. Then re-submit in Google Search Console.

