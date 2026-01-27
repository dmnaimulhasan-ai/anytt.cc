
# Remove Adsterra Direct Link

## Problem Analysis

Based on the session replay, a direct link is being dynamically injected by Adsterra scripts. This link appears as an anchor tag with `id="lkt65"` pointing to `https://everydayhomeless.com/...`. This is a **Direct Link** ad format from Adsterra that gets injected into the page DOM.

The direct link is likely being injected by the **Popunder script** or one of the Social Bar/banner scripts that are loading from `encouragingjawsordinarily.com`.

## Adsterra Scripts Currently Active

| Script | File | Purpose |
|--------|------|---------|
| **Popunder** | `index.html` (line 231) | `54c0f30fa56780913f522dccdde3a60f.js` - Injects direct links |
| **Social Bar** | `SocialBar.tsx` | `b22436c5372c7da186e7f7fb1232cb74.js` |
| **Native Banner** | `NativeBanner.tsx` | `3025235b7f9e8922019d79a8dd0ff449/invoke.js` |
| **Banner/Inline** | Multiple | `59788b78ce7ac0220b51b6164bbec986/invoke.js` |
| **Smartlink** | `useAdMonetization.ts` | Direct URL for "Support Us" button |

## Solution

Remove the Popunder script from `index.html` which is the most likely source of the direct link injection. The popunder script is known to inject hidden direct links that redirect users on interaction.

### Files to Modify

1. **`index.html`** - Remove the Adsterra Popunder script (lines 228-233)
2. **`src/hooks/useAdMonetization.ts`** - Remove `usePopunderTrigger` hook since it won't be needed
3. **`src/pages/Index.tsx`** - Remove the `usePopunderTrigger()` call

### Changes Detail

**index.html**
```text
Remove lines 228-233:
<!-- Adsterra Popunder - Loaded but triggered on user interaction -->
<script
  id="adsterra-popunder"
  src="https://encouragingjawsordinarily.com/54/c0/f3/54c0f30fa56780913f522dccdde3a60f.js"
  async
></script>
```

**src/hooks/useAdMonetization.ts**
- Remove `STORAGE_KEYS.POPUNDER_SESSION`
- Remove `isPopunderTriggered` function
- Remove `markPopunderTriggered` function
- Remove the entire `usePopunderTrigger` export
- Clean up any popunder references

**src/pages/Index.tsx**
- Remove import: `usePopunderTrigger`
- Remove the call: `usePopunderTrigger()`

## Impact

- **Removes**: Direct link injections that appear as hidden `<a>` tags
- **Keeps**: All other ad formats (banners, native ads, social bar, smartlink button)
- **Revenue Impact**: Minimal - popunders typically have low eCPM and cause user friction

## Alternative Consideration

If you want to keep other Adsterra ad formats but ensure no direct links are injected, the popunder script removal is sufficient. Direct links are specifically tied to the popunder/interstitial script format.
