import { useEffect, useState, useCallback } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: { user?: TelegramUser };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: TelegramThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    setText: (t: string) => void;
  };
  onEvent: (event: string, handler: () => void) => void;
  offEvent: (event: string, handler: () => void) => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

// Convert "#rrggbb" to "h s% l%"
function hexToHsl(hex: string): string | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  let r = parseInt(m[1], 16) / 255;
  let g = parseInt(m[2], 16) / 255;
  let b = parseInt(m[3], 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  return `${h.toFixed(0)} ${(s * 100).toFixed(0)}% ${(l * 100).toFixed(0)}%`;
}

function applyTelegramTheme(tp: TelegramThemeParams, isDark: boolean) {
  const root = document.documentElement;
  const map: Record<string, string | undefined> = {
    "--background": tp.bg_color,
    "--foreground": tp.text_color,
    "--card": tp.section_bg_color || tp.bg_color,
    "--card-foreground": tp.text_color,
    "--popover": tp.section_bg_color || tp.bg_color,
    "--popover-foreground": tp.text_color,
    "--primary": tp.button_color,
    "--primary-foreground": tp.button_text_color,
    "--secondary": tp.secondary_bg_color,
    "--secondary-foreground": tp.text_color,
    "--muted": tp.secondary_bg_color,
    "--muted-foreground": tp.hint_color,
    "--accent": tp.accent_text_color || tp.button_color,
    "--accent-foreground": tp.button_text_color,
    "--border": tp.hint_color,
    "--input": tp.secondary_bg_color,
    "--ring": tp.button_color,
  };
  for (const [k, v] of Object.entries(map)) {
    if (v) {
      const hsl = hexToHsl(v);
      if (hsl) root.style.setProperty(k, hsl);
    }
  }
  root.classList.toggle("dark", isDark);
}

export function useTelegramWebApp() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp || !webApp.initData) {
      // Not running inside Telegram — keep normal site theme
      setIsReady(true);
      return;
    }
    setTg(webApp);
    setUser(webApp.initDataUnsafe?.user ?? null);

    try {
      webApp.ready();
      webApp.expand();
    } catch {
      // ignore
    }

    const isDark = webApp.colorScheme === "dark";
    applyTelegramTheme(webApp.themeParams || {}, isDark);

    const onTheme = () => applyTelegramTheme(webApp.themeParams || {}, webApp.colorScheme === "dark");
    webApp.onEvent?.("themeChanged", onTheme);

    setIsReady(true);
    return () => {
      webApp.offEvent?.("themeChanged", onTheme);
    };
  }, []);

  const haptic = useCallback(
    (type: "success" | "error" | "warning" | "light" | "medium" | "heavy" = "medium") => {
      if (!tg?.HapticFeedback) return;
      try {
        if (type === "success" || type === "error" || type === "warning") {
          tg.HapticFeedback.notificationOccurred(type);
        } else {
          tg.HapticFeedback.impactOccurred(type);
        }
      } catch {
        // ignore
      }
    },
    [tg],
  );

  return { tg, isReady, isInTelegram: !!tg, user, haptic };
}
