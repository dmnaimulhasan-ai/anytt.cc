import { useCallback, useRef } from 'react';

// Monetag Direct Link
const DIRECT_LINK_URL = 'https://omg10.com/4/1073301';

const STORAGE_KEYS = {
  SMARTLINK_SESSION: 'ad_smartlink_session',
};

export const useAdMonetization = () => {
  const smartlinkTriggeredRef = useRef(false);

  const isSmartlinkTriggered = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SMARTLINK_SESSION) === 'true';
    } catch {
      return false;
    }
  }, []);

  const triggerSmartlink = useCallback((): boolean => {
    if (isSmartlinkTriggered() || smartlinkTriggeredRef.current) {
      return false;
    }
    
    smartlinkTriggeredRef.current = true;
    
    try {
      window.open(DIRECT_LINK_URL, '_blank', 'noopener,noreferrer');
      sessionStorage.setItem(STORAGE_KEYS.SMARTLINK_SESSION, 'true');
      return true;
    } catch {
      smartlinkTriggeredRef.current = false;
      return false;
    }
  }, [isSmartlinkTriggered]);

  const getAdStatus = useCallback(() => {
    return {
      smartlinkTriggered: isSmartlinkTriggered(),
    };
  }, [isSmartlinkTriggered]);

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
