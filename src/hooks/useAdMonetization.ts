import { useCallback, useRef, useEffect } from 'react';

// New Adsterra Smartlink
const SMARTLINK_URL = 'https://encouragingjawsordinarily.com/rqyzcy60dz?key=b49733451f653cb005e98c6fd641e507';

const STORAGE_KEYS = {
  SMARTLINK_SESSION: 'ad_smartlink_session',
  POPUNDER_TRIGGERED: 'ad_popunder_triggered',
};

interface AdMonetizationResult {
  shouldDelay: boolean;
  delayMs: number;
  showedAd: boolean;
}

export const useAdMonetization = () => {
  const hasTriggeredRef = useRef(false);
  const popunderTriggeredRef = useRef(false);

  // Check if smartlink was already triggered this session
  const isSmartlinkTriggered = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SMARTLINK_SESSION) === 'true';
    } catch {
      return false;
    }
  }, []);

  // Trigger smartlink (one per session, on download click)
  const triggerSmartlink = useCallback((): boolean => {
    if (isSmartlinkTriggered()) return false;
    
    try {
      window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer');
      sessionStorage.setItem(STORAGE_KEYS.SMARTLINK_SESSION, 'true');
      return true;
    } catch {
      return false;
    }
  }, [isSmartlinkTriggered]);

  // Handle download click - triggers smartlink once per session
  const handleDownloadClick = useCallback(async (): Promise<AdMonetizationResult> => {
    // Check if already triggered this session
    if (isSmartlinkTriggered()) {
      return { shouldDelay: false, delayMs: 0, showedAd: false };
    }

    // Prevent double-triggering
    if (hasTriggeredRef.current) {
      return { shouldDelay: false, delayMs: 0, showedAd: false };
    }
    hasTriggeredRef.current = true;

    // Trigger smartlink
    const showedAd = triggerSmartlink();

    // Reset ref after delay
    setTimeout(() => {
      hasTriggeredRef.current = false;
    }, 2000);

    return { 
      shouldDelay: false, 
      delayMs: 0, 
      showedAd 
    };
  }, [isSmartlinkTriggered, triggerSmartlink]);

  // Check ad status for UI feedback
  const getAdStatus = useCallback(() => {
    return {
      smartlinkTriggered: isSmartlinkTriggered(),
    };
  }, [isSmartlinkTriggered]);

  // Reset session tracking (for testing)
  const resetSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.SMARTLINK_SESSION);
    } catch {
      // Ignore
    }
  }, []);

  return {
    handleDownloadClick,
    isSmartlinkTriggered,
    getAdStatus,
    resetSession,
    triggerSmartlink,
  };
};

// Hook to handle popunder on first user interaction
export const usePopunderTrigger = () => {
  const triggeredRef = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (triggeredRef.current) return;
      
      // Check session storage
      try {
        if (sessionStorage.getItem(STORAGE_KEYS.POPUNDER_TRIGGERED) === 'true') {
          triggeredRef.current = true;
          return;
        }
      } catch {}

      triggeredRef.current = true;
      
      // Mark as triggered in session
      try {
        sessionStorage.setItem(STORAGE_KEYS.POPUNDER_TRIGGERED, 'true');
      } catch {}

      // The popunder script is already loaded in index.html
      // It will trigger automatically on user interaction
      // We just need to ensure we don't interfere with it
    };

    // Listen for first interaction (tap or scroll)
    const events = ['click', 'touchstart', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);
};
