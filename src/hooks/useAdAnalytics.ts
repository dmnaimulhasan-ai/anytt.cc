import { supabase } from "@/integrations/supabase/client";

type AdEventType = "load" | "failure" | "timeout" | "click";

interface TrackAdEventParams {
  eventType: AdEventType;
  adComponent: string;
  adPosition?: string;
  errorReason?: string;
}

export const useAdAnalytics = () => {
  const trackAdEvent = async ({
    eventType,
    adComponent,
    adPosition,
    errorReason,
  }: TrackAdEventParams) => {
    try {
      await supabase.functions.invoke("track-ad-analytics", {
        body: {
          event_type: eventType,
          ad_component: adComponent,
          ad_position: adPosition,
          error_reason: errorReason,
        },
      });
    } catch (error) {
      // Silently fail - don't break the user experience for analytics
      console.error("Failed to track ad event:", error);
    }
  };

  return { trackAdEvent };
};
