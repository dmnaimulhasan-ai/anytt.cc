import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { setLanguagePreference } from "@/hooks/useLanguageRedirect";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  path: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", path: "/tiktok-downloader", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", path: "/es/descargar-tiktok", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", path: "/pt/baixar-tiktok", flag: "🇧🇷" },
  { code: "id", name: "Indonesian", nativeName: "Indonesia", path: "/id/unduh-tiktok", flag: "🇮🇩" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", path: "/tr/tiktok-indir", flag: "🇹🇷" },
  { code: "th", name: "Thai", nativeName: "ไทย", path: "/th/tiktok-download", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", path: "/vi/tai-tiktok", flag: "🇻🇳" },
];

/**
 * Language Selector Dropdown
 * Allows users to switch between language versions
 * Saves preference to prevent auto-redirect
 */
const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Detect current language from path
  const getCurrentLanguage = (): Language => {
    const path = location.pathname;
    if (path.startsWith("/es/")) return languages[1];
    if (path.startsWith("/pt/")) return languages[2];
    if (path.startsWith("/id/")) return languages[3];
    if (path.startsWith("/tr/")) return languages[4];
    if (path.startsWith("/th/")) return languages[5];
    if (path.startsWith("/vi/")) return languages[6];
    return languages[0];
  };

  const currentLang = getCurrentLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle language selection - save preference
  const handleLanguageSelect = (lang: Language) => {
    setLanguagePreference(lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in"
          role="listbox"
          aria-label="Language options"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                to={lang.path}
                onClick={() => handleLanguageSelect(lang)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  currentLang.code === lang.code
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
                role="option"
                aria-selected={currentLang.code === lang.code}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
                {currentLang.code === lang.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
