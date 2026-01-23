import { useState, useRef, useEffect, ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: "video" | "square" | "auto";
  priority?: boolean;
}

/**
 * LazyImage Component - Optimized image loading
 * 
 * Features:
 * - Native lazy loading with IntersectionObserver fallback
 * - Blur-up placeholder effect
 * - Error handling with fallback
 * - Fade-in animation on load
 */
const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({
  src,
  alt,
  fallback = "/placeholder.svg",
  aspectRatio = "auto",
  priority = false,
  className,
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const element = imgRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    auto: "",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        ref={(node) => {
          // Handle both refs
          (imgRef as React.MutableRefObject<HTMLImageElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        src={isInView ? (hasError ? fallback : src) : undefined}
        data-src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;
