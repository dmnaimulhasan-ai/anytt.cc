import { useCallback, useRef } from 'react';

const POPUNDER_URL = 'https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd';
const DIRECT_LINK_URL = 'https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd';

const STORAGE_KEYS = {
  LAST_POPUNDER: 'ad_last_popunder',
  SESSION_DIRECT_LINKS: 'ad_session_direct_links',
  FIRST_CLICK_DONE: 'ad_first_click_session',
};

const POPUNDER_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_DIRECT_LINKS_PER_SESSION = 2;
const DOWNLOAD_DELAY_MS = 2000; // 2 second delay

interface AdMonetizationResult {
  shouldDelay: boolean;
  delayMs: number;
  showedAd: boolean;
}

export const useAdMonetization = () => {
  const hasTriggeredRef = useRef(false);

  // Check if popunder can be shown (24h cooldown)
  const canShowPopunder = useCallback((): boolean => {
    try {
      const lastPopunder = localStorage.getItem(STORAGE_KEYS.LAST_POPUNDER);
      if (!lastPopunder) return true;
      
      const lastTime = parseInt(lastPopunder, 10);
      return Date.now() - lastTime >= POPUNDER_COOLDOWN_MS;
    } catch {
      return true;
    }
  }, []);

  // Check if first click ad was already shown in this session
  const isFirstClickDone = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.FIRST_CLICK_DONE) === 'true';
    } catch {
      return false;
    }
  }, []);

  // Get current session direct link count
  const getDirectLinkCount = useCallback((): number => {
    try {
      const count = sessionStorage.getItem(STORAGE_KEYS.SESSION_DIRECT_LINKS);
      return count ? parseInt(count, 10) : 0;
    } catch {
      return 0;
    }
  }, []);

  // Trigger popunder ad
  const triggerPopunder = useCallback(() => {
    try {
      // Open popunder
      const popup = window.open(POPUNDER_URL, '_blank', 'noopener,noreferrer');
      
      // Store timestamp
      localStorage.setItem(STORAGE_KEYS.LAST_POPUNDER, Date.now().toString());
      
      // Try to focus back to main window (may not work in all browsers)
      if (popup) {
        window.focus();
      }
      
      return true;
    } catch {
      return false;
    }
  }, []);

  // Trigger direct link
  const triggerDirectLink = useCallback(() => {
    try {
      const currentCount = getDirectLinkCount();
      if (currentCount >= MAX_DIRECT_LINKS_PER_SESSION) return false;
      
      window.open(DIRECT_LINK_URL, '_blank', 'noopener,noreferrer');
      sessionStorage.setItem(STORAGE_KEYS.SESSION_DIRECT_LINKS, (currentCount + 1).toString());
      
      return true;
    } catch {
      return false;
    }
  }, [getDirectLinkCount]);

  // Main function: handle first download click monetization
  const handleDownloadClick = useCallback(async (): Promise<AdMonetizationResult> => {
    // Check if this is a returning click (already showed ad this session)
    if (isFirstClickDone()) {
      return { shouldDelay: false, delayMs: 0, showedAd: false };
    }

    // Prevent double-triggering
    if (hasTriggeredRef.current) {
      return { shouldDelay: true, delayMs: DOWNLOAD_DELAY_MS, showedAd: false };
    }
    hasTriggeredRef.current = true;

    let showedAd = false;

    // Try popunder first (if within 24h cooldown, use direct link)
    if (canShowPopunder()) {
      showedAd = triggerPopunder();
    } else {
      // Fallback to direct link
      showedAd = triggerDirectLink();
    }

    // Mark first click as done for this session
    try {
      sessionStorage.setItem(STORAGE_KEYS.FIRST_CLICK_DONE, 'true');
    } catch {
      // Ignore storage errors
    }

    // Reset the ref after a delay to allow future clicks
    setTimeout(() => {
      hasTriggeredRef.current = false;
    }, 3000);

    return { 
      shouldDelay: showedAd, 
      delayMs: showedAd ? DOWNLOAD_DELAY_MS : 0, 
      showedAd 
    };
  }, [canShowPopunder, isFirstClickDone, triggerPopunder, triggerDirectLink]);

  // Check ad status for UI feedback
  const getAdStatus = useCallback(() => {
    return {
      canShowPopunder: canShowPopunder(),
      isFirstClickDone: isFirstClickDone(),
      directLinksRemaining: MAX_DIRECT_LINKS_PER_SESSION - getDirectLinkCount(),
    };
  }, [canShowPopunder, isFirstClickDone, getDirectLinkCount]);

  // Reset session tracking (for testing)
  const resetSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.FIRST_CLICK_DONE);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION_DIRECT_LINKS);
    } catch {
      // Ignore
    }
  }, []);

  return {
    handleDownloadClick,
    canShowPopunder,
    isFirstClickDone,
    getAdStatus,
    resetSession,
    triggerDirectLink,
  };
};
