import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";
import { BASE_URL, getBreadcrumbSchema, getItemListSchema, getFAQSchema } from "@/lib/seo-config";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 6;

const blogFaqs = [
  {
    question: "How do I download TikTok videos without watermark?",
    answer: "Copy the TikTok video URL, paste it into AnyTT.cc, and click Download. Your video will be saved without the TikTok watermark in HD quality."
  },
  {
    question: "Can I download TikTok audio as MP3?",
    answer: "Yes, AnyTT lets you extract and download TikTok audio/music as MP3 files. Just paste the video URL and select the MP3 option."
  },
  {
    question: "Does AnyTT work on iPhone?",
    answer: "Yes, AnyTT works perfectly on iPhone. Use Safari browser, paste the TikTok link, and download. Videos save to your Files or Photos app."
  },
  {
    question: "Is AnyTT free to use?",
    answer: "Yes, AnyTT is 100% free with no hidden fees, subscriptions, or download limits. Download unlimited TikTok videos forever."
  }
];

/**
 * Blog Page - SEO Optimized with accessible pagination
 * Uses proper semantic HTML and crawlable links
 */
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AnyTT Blog - TikTok Video Download Guides & Tutorials",
    "description": "Learn how to download TikTok videos without watermark with our step-by-step guides.",
    "url": `${BASE_URL}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "AnyTT",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/pwa-192x192.png`
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${BASE_URL}/blog/${post.slug}`,
      "datePublished": post.date
    }))
  };

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` }
  ]);

  const itemListJsonLd = getItemListSchema(
    blogPosts.map((post, index) => ({
      name: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      position: index + 1
    }))
  );

  // Pagination handler
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="TikTok Download Guides & Tutorials | AnyTT Blog"
        description="Learn how to download TikTok videos without watermark. Step-by-step tutorials, tips, and guides for saving TikTok videos on any device."
        canonicalUrl={`${BASE_URL}/blog`}
        keywords="download TikTok, fast downloads, social media, video downloader, tiktok download guide, tiktok tutorial, how to download tiktok videos, tiktok video saver tips"
        jsonLd={[blogSchema, breadcrumbJsonLd, itemListJsonLd, getFAQSchema(blogFaqs)]}
      />
      <Header />
      <main>
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-black font-display mb-4">
                TikTok Download <span className="gradient-text">Guides & Tutorials</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn how to download TikTok videos without watermark with our easy-to-follow guides.
              </p>
            </div>
            
            
            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                />
              ))}
            </div>

            {/* Pagination - SEO friendly with proper navigation */}
            {totalPages > 1 && (
              <nav 
                className="flex items-center justify-center gap-2 mt-12" 
                aria-label="Blog pagination"
                role="navigation"
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => goToPage(page)}
                    className="rounded-xl min-w-[40px]"
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="rounded-xl"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            )}
            

            {/* Internal links for SEO */}
            <div className="mt-12 text-center">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <nav className="flex flex-wrap justify-center gap-4" aria-label="Quick navigation">
                <Link 
                  to="/tiktok-downloader" 
                  className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  title="Download TikTok videos without watermark"
                >
                  TikTok Downloader
                </Link>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  title="Frequently asked questions"
                >
                  FAQ
                </Link>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
