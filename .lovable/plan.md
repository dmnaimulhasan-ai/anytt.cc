# Ads দৃশ্যমান করার পরিকল্পনা

## সমস্যা

Monetag In-Page Push (zone 10733016) হলো **notification-style overlay** ad — এটা পেজের content এর মধ্যে visible banner হিসেবে দেখায় না। তাই `BannerAd`, `NativeBanner`, `InlineAd`, `ResponsiveAd`, `ScrollBanner` — এগুলোর container div খালি থাকে। ইউজার কোনো ad দেখতে পায় না।

Vignette, Popunder, Push Notifications — এগুলো background/overlay ad, সেগুলো ঠিক আছে। কিন্তু **inline visible ads** দরকার।

## সমাধান

Monetag In-Page Push scripts background এ থাকবে (revenue generate করবে), কিন্তু পাশাপাশি **visible ad banners** যোগ করবো যেগুলো Direct Link (`https://omg10.com/4/1073301`) এ redirect করবে। এতে ইউজার ad দেখবে এবং click করলে revenue আসবে।

## কী তৈরি হবে

### 1. নতুন Visible Ad Components

**a) `BannerAd.tsx` — Redesign**

- একটি আকর্ষণীয় card-style banner যেখানে promotional content থাকবে
- "Sponsored" label + eye-catching design + CTA button
- Click করলে Direct Link open হবে নতুন tab এ
- Rotating ad copy (3-4 variations randomly দেখাবে)
- Monetag In-Page Push script ও background এ load হবে

**b) `NativeBanner.tsx` — Native-looking ad card**

- পেজের content এর সাথে মিলে যায় এমন design
- "Recommended" বা "Sponsored" tag সহ
- Direct Link এ redirect

**c) `InlineAd.tsx` — Inline promotional banner**

- Sections এর মাঝে বসবে
- Gradient background + bold CTA
- Direct Link এ redirect

**d) `ScrollBanner.tsx` — Scroll-triggered visible banner**  

- 5% scroll করলে দেখাবে
- Floating/sticky style
- Close button সহ

### 2. Index.tsx — আরও ad placement যোগ

- HeroSection এর নিচে একটি `BannerAd`
- AboutSection ও HowToSection এর মাঝে `InlineAd`
- FAQ এর নিচে `NativeBanner`

### 3. TikTokDownloader.tsx ও অন্যান্য pages

- Download result এর নিচে `BannerAd`
- FAQ section এর আগে `NativeBanner`

### 4. Ad Content Variations

Banner গুলোতে rotating content থাকবে:

- "🔥 Exclusive Deal — Claim Your Reward!"
- "🎁 Free Gift — Limited Time Offer"  
- "⚡ Trending Now — Don't Miss Out"
- "💰 Special Offer — Click to Unlock"

## পরিবর্তিত ফাইল


| ফাইল | কাজ    |
| ---- | ------ |
| `src | &nbsp; |
