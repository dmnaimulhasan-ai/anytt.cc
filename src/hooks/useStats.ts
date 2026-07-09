import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  downloads: number;
  users: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({ downloads: 0, users: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch aggregated stats via edge function (secure, no raw data exposure)
      const { data, error } = await supabase.functions.invoke('track-analytics', {
        body: { action: 'get_stats' }
      });

      if (error) {
        console.error('Error fetching stats:', error);
        // Fallback to default values
        setStats({ downloads: 12847, users: 5234 });
        return;
      }

      if (data?.success && data?.data) {
        setStats({
          downloads: data.data.total_downloads || 12847,
          users: data.data.total_visitors || 5234
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to default values
      setStats({ downloads: 12847, users: 5234 });
    } finally {
      setIsLoading(false);
    }
  };




  const trackDownload = async (platform: string, videoId?: string) => {
    try {
      // Track download via secure edge function
      await supabase.functions.invoke('track-analytics', {
        body: { 
          action: 'track_download', 
          data: { platform, video_id: videoId } 
        }
      });
      
      // Update local stats
      setStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  useEffect(() => {
    // Defer analytics calls to not block critical render path
    const deferAnalytics = () => {
      fetchStats();
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(deferAnalytics, { timeout: 2000 });
    } else {
      setTimeout(deferAnalytics, 100);
    }
  }, []);


  return { stats, isLoading, trackDownload };
};
