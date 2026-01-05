import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/blog-data";
import { BASE_URL } from "@/lib/seo-config";

const Blog = () => {
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" }
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AnyTT Blog - Video Download Guides & Tutorials",
    "description": "Learn how to download videos from TikTok, YouTube, and Facebook with our step-by-step guides.",
    "url": `${BASE_URL}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "AnyTT",
      "url": BASE_URL
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${BASE_URL}/blog/${post.slug}`,
      "datePublished": post.date
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Video Download Guides & Tutorials | AnyTT Blog"
        description="Learn how to download videos from TikTok, YouTube, and Facebook. Step-by-step tutorials, tips, and guides for saving videos on any device."
        canonicalUrl={`${BASE_URL}/blog`}
        keywords="video download guide, tiktok tutorial, youtube download help, facebook video save, how to download videos"
        jsonLd={[blogSchema]}
      />
      <Header />
      <main className="pt-20">
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-black font-display mb-4">
                Video Download <span className="gradient-text">Guides & Tutorials</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn how to download videos from TikTok, YouTube, Facebook and more with our easy-to-follow guides.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
