

# Monetag Ad Integration Plan — Adsterra Replace + নতুন Formats

## সারসংক্ষেপ

Adsterra এর সব ad codes সরিয়ে Monetag এর ads দিয়ে replace করবো, এবং নতুন Monetag formats (Vignette, In-Page Push, Push Notifications, Popunder, Direct Link) যোগ করবো।

## কী পরিবর্তন হবে

### 1. Adsterra Ads সরানো ও Monetag দিয়ে Replace

**যে components পরিবর্তন হবে:**

| Component | আগে (Adsterra) | পরে (Monetag) |
|---|---|---|
| `BannerAd.tsx` | Adsterra 300x250 iframe | Monetag In-Page Push banner |
| `NativeBanner.tsx` | Adsterra Native Banner | Monetag Vignette trigger zone |
| `InlineAd.tsx` | Adsterra 300x250 | Monetag In-Page Push banner |
| `ResponsiveAd.tsx` | Adsterra 300x250 | Monetag In-Page Push banner |
| `ScrollBanner.tsx` | Adsterra scroll-triggered | Monetag In-Page Push (scroll-triggered) |
| `SocialBar.tsx` | Adsterra Social Bar | Remove (Monetag has its own formats) |
| `SmartlinkButton.tsx` |