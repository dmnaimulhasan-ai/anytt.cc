import { useCallback, useRef, useEffect } from 'react';

// Adsterra Smartlink - ONLY triggered via separate "Continue" button
const SMARTLINK_URL = 'https://encouragingjawsordinarily.com/rqyzcy60dz?key=b49733451f653cb005e98c6fd641e507';

const STORAGE_KEYS = {
  SMARTLINK_SESSION: 'ad_smartlink_session',
  POPUNDER_SESSION: 'ad_popunder_session',
};

/**
 * Adsterra Policy-Compliant Ad Monetization Hook
 * 
 * RULES:
 * 1. Smartlink ONLY via separate "Continue" button (NOT download button)
 * 2. Max 1 smartlink per session
 * 3. Opens in new tab, no auto-redirect
 * 4. Popunder ONLY on first user interaction (NOT page load)
 * 5. No combining popunder + smartlink on same click
 */
export const useAdMonetization = () => {
  const smartlinkTriggeredRef = useRef(false);

  // Check if smartlink was already triggered this session
  const isSmartlinkTriggered = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SMARTLINK_SESSION) === 'true';
    } catch {
      return false;
    }
  }, []);

  // Check if popunder was already triggered this session
  const isPopunderTriggered = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.POPUNDER_SESSION) === 'true';
    } catch {
      return false;
    }
  }, []);

  /**
   * Trigger smartlink - ONLY from dedicated "Continue/Support Us" button
   * Opens in new tab, max 1 per session
   */
  const triggerSmartlink = useCallback((): boolean => {
    if (isSmartlinkTriggered() || smartlinkTriggeredRef.current) {
      return false;
    }
    
    smartlinkTriggeredRef.current = true;
    
    try {
      // Open in new tab
      window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer');
      sessionStorage.setItem(STORAGE_KEYS.SMARTLINK_SESSION, 'true');
      return true;
    } catch {
      smartlinkTriggeredRef.current = false;
      return false;
    }
  }, [isSmartlinkTriggered]);

  /**
   * Mark popunder as triggered in session
   * Called by popunder trigger hook
   */
  const markPopunderTriggered = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.POPUNDER_SESSION, 'true');
    } catch {}
  }, []);

  // Get ad status for UI
  const getAdStatus = useCallback(() => {
    return {
      smartlinkTriggered: isSmartlinkTriggered(),
      popunderTriggered: isPopunderTriggered(),
    };
  }, [isSmartlinkTriggered, isPopunderTriggered]);

  // Reset session (for testing only)
  const resetSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.SMARTLINK_SESSION);
      sessionStorage.removeItem(STORAGE_KEYS.POPUNDER_SESSION);
      smartlinkTriggeredRef.current = false;
    } catch {}
  }, []);

  return {
    isSmartlinkTriggered,
    isPopunderTriggered,
    triggerSmartlink,
    markPopunderTriggered,
    getAdStatus,
    resetSession,
  };
};

/**
 * Popunder Trigger Hook
 * RULES:
 * - Trigger ONLY on first user interaction (click/touch/scroll)
 * - NOT on page load
 * - Max 1 per session
 * - Does NOT combine with smartlink on same action
 */
export const usePopunderTrigger = () => {
  const triggeredRef = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      // Skip if already triggered
      if (triggeredRef.current) return;
      
      // Check session storage
      try {
        if (sessionStorage.getItem(STORAGE_KEYS.POPUNDER_SESSION) === 'true') {
          triggeredRef.current = true;
          return;
        }
      } catch {}

      triggeredRef.current = true;
      
      // Mark as triggered in session
      try {
        sessionStorage.setItem(STORAGE_KEYS.POPUNDER_SESSION, 'true');
      } catch {}

      // The popunder script loaded in index.html will handle the ad
      // We just mark it as triggered to prevent duplicates
    };

    // Listen for first real user interaction
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
