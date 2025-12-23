import { Zap, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="py-4 px-6 relative z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-2 shadow-glow-pink">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">
            <span className="gradient-text">GEN-Z</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Home
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Facebook
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
