import { MessageCircle } from "lucide-react";

const FloatingSupportButton = () => {
  return (
    <a
      href="https://t.me/GEN_ZDownloader"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact Support on Telegram"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-primary to-accent p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </div>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card text-card-foreground text-sm px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Need help? Chat with us!
        </span>
      </div>
    </a>
  );
};

export default FloatingSupportButton;
