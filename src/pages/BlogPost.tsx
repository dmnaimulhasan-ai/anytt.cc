import { useParams, Navigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { getBlogPost, getRelatedPosts, getInternalLinks } from "@/lib/blog-data";
import { BASE_URL, getBreadcrumbSchema } from "@/lib/seo-config";
import { Calendar, Clock, ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const internalLinks = getInternalLinks();

  // Get contextually relevant internal links based on post keywords
  const relevantLinks = internalLinks.filter(link => 
    link.keywords.some(keyword => 
      post.keywords.some(pk => pk.toLowerCase().includes(keyword.toLowerCase()))
    )
  ).slice(0, 4);
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "url": `${BASE_URL}/blog/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "AnyTT"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnyTT",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/pwa-512x512.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${post.slug}` }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={post.metaTitle}
        description={post.metaDescription}
        canonicalUrl={`${BASE_URL}/blog/${post.slug}`}
        keywords={post.keywords.join(", ")}
        jsonLd={[articleSchema, breadcrumbJsonLd]}
      />
      <Header />
      <main className="pt-20">
        <article className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <Breadcrumb items={breadcrumbItems} />
            
            <Link to="/blog">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <header className="mb-8">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary/10 text-primary rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black font-display mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </header>
            
            {/* In-content Native Banner */}
            <NativeBanner />
            
            {/* SECURITY NOTE: Blog content is static/hardcoded in src/lib/blog-data.ts (developer-controlled).
                If blog content is ever sourced from a CMS, user input, or external API,
                the markdown-to-HTML conversion below MUST be replaced with a proper markdown
                library (e.g., react-markdown) and additional input validation must be added. */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-display prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:my-1
                prose-table:border-border prose-th:bg-muted prose-td:border-border"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(
                  post.content
                    .replace(/^## /gm, '<h2>')
                    .replace(/^### /gm, '<h3>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/<h2>(.+)/g, '</p><h2>$1</h2><p>')
                    .replace(/<h3>(.+)/g, '</p><h3>$1</h3><p>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/✅/g, '<span class="text-green-500">✅</span>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                    .replace(/^- (.+)/gm, '<li>$1</li>')
                    .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
                    .replace(/^\d+\. (.+)/gm, '<li>$1</li>'),
                  { ALLOWED_TAGS: ['h2', 'h3', 'p', 'a', 'strong', 'span', 'ul', 'ol', 'li'], ALLOWED_ATTR: ['href', 'class', 'target', 'rel'] }
                )
              }}
            />
            
            {/* Mid-content Banner Ad */}
            <BannerAd />
            
            {/* CTA Section */}
            <div className="mt-12 p-6 glass-card rounded-2xl text-center">
              <h3 className="text-xl font-bold font-display mb-2">Ready to Download Videos?</h3>
              <p className="text-muted-foreground mb-4">Try AnyTT now - it's free and works on all devices!</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/tiktok-downloader">
                  <Button>TikTok Downloader</Button>
                </Link>
              </div>
            </div>

            {/* Contextual Internal Links */}
            {relevantLinks.length > 0 && (
              <div className="mt-8 p-6 glass-card rounded-2xl">
                <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Related Guides
                </h3>
                <ul className="space-y-2">
                  {relevantLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.url} 
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        → {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Promotional Smartlink CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 text-center">
              <h3 className="text-xl font-bold font-display mb-2">🎁 Exclusive Deals & Offers</h3>
              <p className="text-muted-foreground mb-4">Check out amazing deals and premium content!</p>
              <a 
                href="https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Discover Offers
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </article>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 px-4 md:px-6 bg-muted/10">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold font-display mb-6 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.slug}
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    date={relatedPost.date}
                    readTime={relatedPost.readTime}
                    category={relatedPost.category}
                    image={relatedPost.image}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
