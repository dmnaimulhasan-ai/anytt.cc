# সাইট আলাদা করার জন্য নতুন ফিচার প্ল্যান

## বর্তমান সমস্যা (Analytics থেকে)

- 59 visitors / 2 সপ্তাহ, 78% bounce rate
- বেশিরভাগ Direct traffic, Google থেকে মাত্র 4 visit
- ইউজাররা আসে, একবার ব্যবহার করে চলে যায় — return visitor নেই

## প্রস্তাবিত ফিচারসমূহ (প্রায়োরিটি অনুযায়ী)

### 1. TikTok Profile/Username Downloader (সবার আগে করা উচিত)

**কেন আলাদা:** বেশিরভাগ competitor শুধু single URL support করে। Username দিলে সেই profile এর সব video দেখাবে এবং select করে batch download করা যাবে।

- ইউজার `@username` টাইপ করবে
- Profile এর recent videos list দেখাবে (thumbnail + title)
- Select all / individual select করে download
- এটা SnapTik, SSStiK কেউ ঠিকমতো করে না

### 2. Download History (LocalStorage-based)

**কেন আলাদা:** ইউজাররা ফিরে আসবে আগের downloads দেখতে। Bounce rate কমবে।

- LocalStorage তে download history সেভ (thumbnail, title, date, platform)
- Homepage এ "Recent Downloads" section
- Re-download button
- No login required — privacy friendly

### 3. TikTok Sound/Music Finder

**কেন আলাদা:** কোনো competitor এটা করে না। Viral sound এর নাম থেকে search করে সেই sound ব্যবহারকারী videos দেখানো।

- Sound URL paste করলে sound details + top videos দেখাবে
- Sound MP3 direct download
- "Trending Sounds" page — SEO traffic আনবে

### 4. Video Preview Player (In-browser)

**কেন আলাদা:** Download করার আগে video preview দেখা যাবে browser এ। বেশিরভাগ competitor blind download করায়।

- Download page এ embedded video player
- Play/pause, mute controls
- "Download This" button overlay

### 5. Instagram Reels Downloader (নতুন Platform)

**কেন আলাদা:** একই সাইটে TikTok + Pinterest + Instagram = one-stop solution। SEO traffic বাড়বে অনেক।

- Instagram Reels, Stories, Posts download
- নতুন edge function `instagram-download`
- নতুন landing page `/instagram-downloader`
- Huge keyword market: "instagram reels download", "insta saver"

### 6. Bookmark/PWA "Add to Home Screen" Push

**কেন আলাদা:** PWA already আছে কিন্তু actively prompt করা হচ্ছে না। Install prompt দিলে return visitors বাড়বে।

- Download সফল হলে "Add to Home Screen" prompt দেখানো
- Custom install banner with app icon
- PWA offline support already আছে — just need better prompting

### 7. Video-to-GIF Converter

**কেন আলাদা:** Download এর পর video থেকে GIF বানানো — client-side, কোনো server দরকার নেই।

- ffmpeg.wasm দিয়ে browser এ GIF convert
- Start/end time selector
- Quality/size options
- Shareable GIF output

## বাস্তবায়নের ক্রম (রিকমেন্ডেড)


| Priority | Feature                     | Impact              | Effort |
| -------- | --------------------------- | ------------------- | ------ |
| 1        | Download History            | High (retention)    | Low    |
| 2        | Video Preview Player        | High (UX)           | Low    |
| 3        | PWA Install Prompt          | Medium (retention)  | Low    |
| 4        | Profile/Username Downloader | Very High (unique)  | Medium |
| 5        | Instagram Reels Downloader  | Very High (traffic) | Medium |
| 6        | Sound/Music Finder          | High (unique)       | Medium |
| 7        | Video-to-GIF Converter      | Medium (unique)     | High   |


## টেকনিক্যাল ডিটেইলস

```text
Feature 1 - Download History:
  - New component: src/components/DownloadHistory.tsx
  - New hook: src/hooks/useDownloadHistory.ts
  - LocalStorage key: "anytt_download_history"
  - Max 50 items, auto-cleanup older entries
  - Add to Index.tsx below HeroSection

Feature 2 - Video Preview:
  - Modify VideoResult.tsx to add <video> player
  - Use proxy-download edge function for CORS
  - Lazy load video on user interaction

Feature 3 - PWA Install Prompt:
  - New component: src/components/InstallPrompt.tsx
  - Listen for beforeinstallprompt event
  - Show after successful download

Feature 4 - Profile Downloader:
  - New edge function: supabase/functions/tiktok-profile/index.ts
  - New component: src/components/ProfileDownloader.tsx
  - Username regex: /^@?[\w.]+$/

Feature 5 - Instagram Downloader:
  - New edge function: supabase/functions/instagram-download/index.ts
  - New page: src/pages/InstagramDownloader.tsx
  - New route: /instagram-downloader
```

কোন ফিচার(গুলো) আগে implement করতে চান সেটা বলুন, আমি শুরু করবো।

&nbsp;