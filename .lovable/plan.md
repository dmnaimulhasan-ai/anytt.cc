

# AI (ChatGPT, Gemini, Perplexity) এর কাছে সাইট পরিচিত করার প্ল্যান

AI সিস্টেমগুলো (ChatGPT, Google Gemini, Perplexity, Microsoft Copilot) ওয়েবসাইট থেকে তথ্য সংগ্রহ করে বিশেষ কিছু ফাইল ও স্ট্রাকচারের মাধ্যমে। নিচে সেগুলো যোগ করার প্ল্যান:

---

## 1. `llms.txt` ফাইল তৈরি (সবচেয়ে গুরুত্বপূর্ণ)

এটি একটি নতুন স্ট্যান্ডার্ড যা AI মডেলদের বলে আপনার সাইট কী করে। ChatGPT, Perplexity, এবং অন্যান্য AI এই ফাইল পড়ে।

**নতুন ফাইল:** `public/llms.txt`
- সাইটের নাম, বর্ণনা, প্রধান ফিচার
- প্রতিটি পেজের সংক্ষিপ্ত বিবরণ ও লিংক
- সাপোর্টেড ল্যাঙ্গুয়েজ তালিকা
- ব্যবহার নির্দেশিকা (কিভাবে কাজ করে)

## 2. `llms-full.txt` ফাইল তৈরি

AI মডেলদের জন্য বিস্তারিত তথ্য - FAQ, ফিচার তুলনা, সব কিছু এক জায়গায়।

**নতুন ফাইল:** `public/llms-full.txt`

## 3. robots.txt আপডেট

AI ক্রলারদের (GPTBot, Google-Extended, PerplexityBot, ClaudeBot) জন্য এক্সপ্লিসিট Allow রুল এবং `llms.txt` এর লিংক যোগ।

**পরিবর্তিত ফাইল:** `public/robots.txt`
- GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, Applebot-Extended এর জন্য Allow রুল
- Bengali ও Hindi পেজের Allow রুল (এগুলো আগে যোগ হয়নি)

## 4. Schema.org structured data উন্নত করা

`index.html` এ `SoftwareApplication` স্কিমা যোগ করা যাতে AI সিস্টেম সাইটের ফিচার ভালোভাবে বুঝতে পারে।

**পরিবর্তিত ফাইল:** `index.html`
- `SoftwareApplication` JSON-LD স্কিমা যোগ (নাম, বর্ণনা, ফিচার, সাপোর্টেড প্ল্যাটফর্ম)

## 5. `.well-known/ai-plugin.json` তৈরি

OpenAI এর ChatGPT প্লাগিন ডিসকভারি ফরম্যাটে সাইটের তথ্য - এটি AI কে আপনার সাইট চিনতে সাহায্য করে।

**নতুন ফাইল:** `public/.well-known/ai-plugin.json`

---

## টেকনিক্যাল সারাংশ

| ফাইল | অ্যাকশন | উদ্দেশ্য |
|-------|---------|---------|
| `public/llms.txt` | নতুন তৈরি | AI মডেলদের জন্য সাইট সামারি |
| `public/llms-full.txt` | নতুন তৈরি | AI মডেলদের জন্য বিস্তারিত তথ্য |
| `public/.well-known/ai-plugin.json` | নতুন তৈরি | ChatGPT প্লাগিন ডিসকভারি |
| `public/robots.txt` | আপডেট | AI ক্রলার Allow রুল যোগ |
| `index.html` | আপডেট | SoftwareApplication স্কিমা যোগ |

এই পরিবর্তনের পর যখন কেউ ChatGPT বা Perplexity তে "best TikTok downloader" বা "anytt cc" জিজ্ঞেস করবে, AI আপনার সাইটের তথ্য দিতে পারবে।

