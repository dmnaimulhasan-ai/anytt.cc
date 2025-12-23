import { Download } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Download className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              SaveTT<span className="text-sm font-normal text-muted-foreground">.cc</span>
            </span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © 2024 SaveTT.cc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
