

# React forwardRef Warning ফিক্স

## সমস্যা
`FloatingSupportButton` এবং `FloatingBanner` কম্পোনেন্ট `lazy()` দিয়ে লোড করা হচ্ছে যা React এ "Function components cannot be given refs" ওয়ার্নিং দেয়।

## সমাধান
এই দুটি কম্পোনেন্ট অত্যন্ত ছোট — `FloatingBanner` শুধু `null` রিটার্ন করে এবং `FloatingSupportButton` একটি সিম্পল লিংক। এদের lazy load করার দরকার নেই। সরাসরি import করলেই ওয়ার্নিং চলে যাবে এবং পারফরম্যান্সে কোনো প্রভাব পড়বে না।

## টেকনিক্যাল পরিবর্তন

**ফাইল:** `src/App.tsx`

- `lazy()` import সরিয়ে সরাসরি import করা:
  ```typescript
  import FloatingSupportButton from "./components/FloatingSupportButton";
  import FloatingBanner from "./components/ads/FloatingBanner";
  ```
- `Suspense` wrapper সরানো (আর দরকার নেই):
  ```tsx
  <FloatingSupportButton />
  <FloatingBanner />
  ```

এই একটি ফাইলেই পরিবর্তন — বাকি কোনো ফাইল পরিবর্তন লাগবে না।

