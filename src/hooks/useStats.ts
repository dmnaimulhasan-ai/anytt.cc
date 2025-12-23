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
      // Get download count
      const { count: downloadCount } = await supabase
        .from('download_stats')
        .select('*', { count: 'exact', head: true });

      // Get visitor count
      const { count: visitorCount } = await supabase
        .from('visitor_stats')
        .select('*', { count: 'exact', head: true });

      setStats({
        downloads: (downloadCount || 0) + 12847, // Add base count for display
        users: (visitorCount || 0) + 5234 // Add base count for display
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackVisitor = async () => {
    try {
      // Get or create visitor ID from localStorage
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      // Upsert visitor
      await supabase
        .from('visitor_stats')
        .upsert({
          visitor_id: visitorId,
          last_visit: new Date().toISOString()
        }, { onConflict: 'visitor_id' });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  const trackDownload = async (platform: string, videoId?: string) => {
    try {
      await supabase
        .from('download_stats')
        .insert({
          platform,
          video_id: videoId
        });
      
      // Update local stats
      setStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  useEffect(() => {
    trackVisitor();
    fetchStats();
  }, []);

  return { stats, isLoading, trackDownload };
};
