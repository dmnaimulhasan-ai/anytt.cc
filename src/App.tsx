import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";

import FloatingSupportButton from "./components/FloatingSupportButton";
import FloatingBanner from "./components/ads/FloatingBanner";
import InstallPrompt from "./components/InstallPrompt";

// Lazy load non-critical routes to reduce initial bundle size
const TikTokDownloader = lazy(() => import("./pages/TikTokDownloader"));
const TikTokDownloaderES = lazy(() => import("./pages/TikTokDownloaderES"));
const TikTokDownloaderPT = lazy(() => import("./pages/TikTokDownloaderPT"));
const TikTokDownloaderID = lazy(() => import("./pages/TikTokDownloaderID"));
const TikTokDownloaderTR = lazy(() => import("./pages/TikTokDownloaderTR"));
const TikTokDownloaderTH = lazy(() => import("./pages/TikTokDownloaderTH"));
const TikTokDownloaderVI = lazy(() => import("./pages/TikTokDownloaderVI"));
const TikTokDownloaderBN = lazy(() => import("./pages/TikTokDownloaderBN"));
const TikTokDownloaderHI = lazy(() => import("./pages/TikTokDownloaderHI"));
const PinterestDownloader = lazy(() => import("./pages/PinterestDownloader"));
const PinterestFAQ = lazy(() => import("./pages/PinterestFAQ"));

// Eagerly load LCP-critical pages (flagged by CWV)
import About from "./pages/About";
import FAQ from "./pages/FAQ";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Download = lazy(() => import("./pages/Download"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const DMCA = lazy(() => import("./pages/DMCA"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback to avoid layout shift
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FloatingSupportButton />
      <FloatingBanner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/download" element={<Download />} />
            <Route path="/tiktok-downloader" element={<TikTokDownloader />} />
            <Route path="/pinterest-downloader" element={<PinterestDownloader />} />
            <Route path="/pinterest-faq" element={<PinterestFAQ />} />
            {/* Multilingual landing pages */}
            <Route path="/es/descargar-tiktok" element={<TikTokDownloaderES />} />
            <Route path="/pt/baixar-tiktok" element={<TikTokDownloaderPT />} />
            <Route path="/id/unduh-tiktok" element={<TikTokDownloaderID />} />
            <Route path="/tr/tiktok-indir" element={<TikTokDownloaderTR />} />
            <Route path="/th/tiktok-download" element={<TikTokDownloaderTH />} />
            <Route path="/vi/tai-tiktok" element={<TikTokDownloaderVI />} />
            <Route path="/bn/tiktok-download" element={<TikTokDownloaderBN />} />
            <Route path="/hi/tiktok-download" element={<TikTokDownloaderHI />} />
            
            {/* Legacy redirects - handled by _redirects for SEO */}
            
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
