import { useEffect } from "react";

interface HreflangTag {
  lang: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object[];
  hreflang?: HreflangTag[];
  lang?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl, 
  keywords,
  ogImage = "https://anytt.cc/og-image.jpg",
  ogType = "website",
  jsonLd = [],
  hreflang = [],
  lang = "en"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    // Standard meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    
    // Twitter
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }

    // Hreflang tags
    const existingHreflang = document.querySelectorAll('link[data-hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    hreflang.forEach((tag) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', tag.lang);
      link.setAttribute('href', tag.url);
      link.setAttribute('data-hreflang', tag.lang);
      document.head.appendChild(link);
    });
    
    // JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach(script => script.remove());
    
    jsonLd.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', String(index));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    
    return () => {
      // Cleanup JSON-LD scripts on unmount
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(script => script.remove());
      // Cleanup hreflang on unmount
      const hreflangLinks = document.querySelectorAll('link[data-hreflang]');
      hreflangLinks.forEach(link => link.remove());
      // Reset lang to default
      document.documentElement.lang = "en";
    };
  }, [title, description, canonicalUrl, keywords, ogImage, jsonLd, hreflang, lang]);
  
  return null;
};

export default SEOHead;
