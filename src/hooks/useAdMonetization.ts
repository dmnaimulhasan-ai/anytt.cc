import { useCallback, useRef } from 'react';

// Adsterra Smartlink - ONLY triggered via separate "Continue" button
const SMARTLINK_URL = 'https://encouragingjawsordinarily.com/rqyzcy60dz?key=b49733451f653cb005e98c6fd641e507';

const STORAGE_KEYS = {
  SMARTLINK_SESSION: 'ad_smartlink_session',
};

/**
 * Adsterra Policy-Compliant Ad Monetization Hook
 * 
 * RULES:
 * 1. Smartlink ONLY via separate "Continue" button (NOT download button)
 * 2. Max 1 smartlink per session
 * 3. Opens in new tab, no auto-redirect
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

  // Get ad status for UI
  const getAdStatus = useCallback(() => {
    return {
      smartlinkTriggered: isSmartlinkTriggered(),
    };
  }, [isSmartlinkTriggered]);

  // Reset session (for testing only)
  const resetSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.SMARTLINK_SESSION);
      smartlinkTriggeredRef.current = false;
    } catch {}
  }, []);

  return {
    isSmartlinkTriggered,
    triggerSmartlink,
    getAdStatus,
    resetSession,
  };
};
