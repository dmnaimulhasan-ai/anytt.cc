

# AI Discoverability সম্পূর্ণ করার প্ল্যান

বর্তমানে `ai-plugin.json` ফাইলে `openapi.yaml` রেফারেন্স করা আছে কিন্তু ফাইলটি বিদ্যমান নেই। এছাড়া কিছু মেটা ট্যাগ যোগ করলে AI ক্রলাররা আরো সহজে সাইটের তথ্য খুঁজে পাবে।

---

## 1. `public/openapi.yaml` তৈরি

`ai-plugin.json` এ এই ফাইলের রেফারেন্স আছে কিন্তু ফাইলটি নেই — এটা তৈরি করতে হবে। এতে সাইটের API/ফাংশনালিটির বর্ণনা থাকবে (TikTok ও Pinterest ডাউনলোড এন্ডপয়েন্ট)।

## 2. `index.html` এ AI মেটা লিংক যোগ

HTML `<head>` এ নিচের ট্যাগ যোগ:
```html
<link rel="alternate" type="text/plain" href="https://anytt.cc/llms.txt" title="LLM Documentation" />
<link rel="alternate" type="text/plain" href="https://anytt.cc/llms-full.txt" title="LLM Full Documentation" />
```

## 3. `public/.well-known/security.txt` তৈরি

সাইটের বিশ্বস্ততা বাড়ানোর জন্য স্ট্যান্ডার্ড security.txt ফাইল যোগ।

---

## টেকনিক্যাল সারাংশ

| ফাইল | অ্যাকশন | উদ্দেশ্য |
|-------|---------|---------|
| `public/openapi.yaml` | নতুন তৈরি | ai-plugin.json এর রেফারেন্স পূরণ |
| `index.html` | আপডেট | llms.txt মেটা লিংক যোগ |
| `public/.well-known/security.txt` | নতুন তৈরি | সাইটের বিশ্বস্ততা বাড়ানো |

