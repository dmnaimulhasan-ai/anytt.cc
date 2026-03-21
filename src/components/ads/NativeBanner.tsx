/**
 * NativeBanner - Placeholder for Monetag native ads.
 * No custom fake ad content. If Monetag provides a native ad zone,
 * load its official script here. Currently renders nothing to avoid
 * policy violations from deceptive custom banners.
 */
interface NativeBannerProps {
  className?: string;
}

const NativeBanner = ({ className = "" }: NativeBannerProps) => {
  // No custom fake ad content — returns null to stay compliant
  return null;
};

export default NativeBanner;
