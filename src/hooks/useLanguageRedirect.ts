import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LanguageRoute {
  code: string;
  locales: string[]; // Browser locale codes that map to this language
  path: string;
}

const languageRoutes: LanguageRoute[] = [
  { 
    code: "es", 
    locales: ["es", "es-ES", "es-MX", "es-AR", "es-CO", "es-CL", "es-PE", "es-VE"], 
    path: "/es/descargar-tiktok" 
  },
  { 
    code: "pt", 
    locales: ["pt", "pt-BR", "pt-PT"], 
    path: "/pt/baixar-tiktok" 
  },
  { 
    code: "id", 
    locales: ["id", "id-ID"], 
    path: "/id/unduh-tiktok" 
  },
  { 
    code: "bn", 
    locales: ["bn", "bn-BD", "bn-IN"], 
    path: "/bn/tiktok-download" 
  },
  { 
    code: "hi", 
    locales: ["hi", "hi-IN"], 
    path: "/hi/tiktok-download" 
  },
];

const LANGUAGE_PREFERENCE_KEY = "anytt_language_preference";
const REDIRECT_ATTEMPTED_KEY = "anytt_redirect_attempted";

/**
 * Detects browser language and returns matching route
 */
const detectBrowserLanguage = (): LanguageRoute | null => {
  // Get browser languages (ordered by preference)
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    // Check exact match first
    for (const route of languageRoutes) {
      if (route.locales.includes(browserLang)) {
        return route;
      }
    }
    
    // Check prefix match (e.g., "es-419" matches "es")
    const langPrefix = browserLang.split("-")[0];
    for (const route of languageRoutes) {
      if (route.locales.some(locale => locale.startsWith(langPrefix))) {
        return route;
      }
    }
  }
  
  return null; // Default to English (no redirect)
};

/**
 * Check if user has explicitly set a language preference
 */
const hasLanguagePreference = (): boolean => {
  return localStorage.getItem(LANGUAGE_PREFERENCE_KEY) !== null;
};

/**
 * Check if we've already attempted a redirect this session
 */
const hasAttemptedRedirect = (): boolean => {
  return sessionStorage.getItem(REDIRECT_ATTEMPTED_KEY) === "true";
};

/**
 * Mark that we've attempted a redirect
 */
const markRedirectAttempted = (): void => {
  sessionStorage.setItem(REDIRECT_ATTEMPTED_KEY, "true");
};

/**
 * Save user's language preference (called when they manually select a language)
 */
export const setLanguagePreference = (langCode: string): void => {
  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, langCode);
};

/**
 * Get user's saved language preference
 */
export const getLanguagePreference = (): string | null => {
  return localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
};

/**
 * Clear language preference (for testing)
 */
export const clearLanguagePreference = (): void => {
  localStorage.removeItem(LANGUAGE_PREFERENCE_KEY);
  sessionStorage.removeItem(REDIRECT_ATTEMPTED_KEY);
};

/**
 * Hook to auto-redirect users based on browser locale
 * Only redirects on homepage and only once per session
 */
export const useLanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run on homepage
    if (location.pathname !== "/") return;
    
    // Don't redirect if user has set a preference
    if (hasLanguagePreference()) return;
    
    // Don't redirect if already attempted this session
    if (hasAttemptedRedirect()) return;
    
    // Mark that we've attempted
    markRedirectAttempted();
    
    // Detect browser language
    const matchedRoute = detectBrowserLanguage();
    
    if (matchedRoute) {
      // Small delay to let the page render first, then redirect
      const timer = setTimeout(() => {
        navigate(matchedRoute.path, { replace: true });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);
};

export default useLanguageRedirect;
