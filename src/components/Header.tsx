import { Download } from "lucide-react";

const Header = () => {
  return (
    <header className="hero-gradient py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary-foreground rounded-lg p-1.5">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">
            SaveTT<span className="text-sm font-normal opacity-80">.cc</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
            Home
          </a>
          <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
            Facebook Video Downloader
          </a>
          <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
