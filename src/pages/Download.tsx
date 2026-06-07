import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Download, Music, Video, ArrowLeft, Loader2, AlertCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface VideoData {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  hdVideoUrl?: string;
  musicUrl: string;
  musicTitle: string;
}

type Platform = 'tiktok';

const platformConfig: Record<Platform, { name: string; functionName: string; color: string }> = {
  tiktok: { name: 'TikTok', functionName: 'tiktok-download', color: 'bg-[#000000]' },
};

const detectPlatform = (url: string): Platform => {
  return 'tiktok';
};

/**
 * Download Page - NOINDEX
 * Shows video details with quality selection and download buttons
 */
const DownloadPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [platform, setPlatform] = useState<Platform>('tiktok');

  const url = searchParams.get('url');

  useEffect(() => {
    // Add NOINDEX meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    document.title = 'Download Video - AnyTT';

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!url) {
        setError('No video URL provided');
        setIsLoading(false);
        return;
      }

      const detectedPlatform = detectPlatform(url);
      setPlatform(detectedPlatform);
      const config = platformConfig[detectedPlatform];

      try {
        const { data, error: fetchError } = await supabase.functions.invoke(config.functionName, {
          body: { url: url.trim() }
        });

        if (fetchError) throw new Error('Failed to process video');
        if (!data.success) throw new Error(data.error || 'Could not fetch video');

        setVideoData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video');
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Could not fetch video",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    };

    fetchVideo();
  }, [url, toast]);

  const handleDownload = (downloadUrl: string, quality: string) => {
    window.open(downloadUrl, '_blank');
    toast({
      title: "Download Started",
      description: `Downloading ${quality} video...`,
    });
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-lg">
          
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>

          {/* Loading State */}
          {isLoading && (
            <div className="glass-card rounded-3xl p-8 text-center space-y-4 animate-fade-in">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Preparing Your Download</h1>
              <p className="text-lg font-medium">Fetching video...</p>
              <p className="text-muted-foreground">This may take a moment</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="glass-card rounded-3xl p-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-xl font-bold">Download Error</h1>
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => navigate('/')} className="btn-primary mt-4">
                Try Another Link
              </Button>
            </div>
          )}

          {/* Video Data */}
          {videoData && !isLoading && (
            <div className="space-y-6 animate-bounce-in">
              
              {/* Platform Badge */}
              <div className="flex justify-center">
                <span className={`px-4 py-2 rounded-full text-white font-semibold ${platformConfig[platform].color}`}>
                  {platformConfig[platform].name}
                </span>
              </div>

              {/* Video Card */}
              <div className="glass-card rounded-3xl overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted">
                  <img
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {videoData.duration > 0 && (
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 text-white text-sm font-medium rounded">
                      {formatDuration(videoData.duration)}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5 space-y-4">
                  <h1 className="text-lg font-bold leading-tight line-clamp-2">
                    {videoData.title || 'Untitled Video'}
                  </h1>
                  
                  {videoData.author && (
                    <div className="flex items-center gap-3">
                      {videoData.authorAvatar && (
                        <img
                          src={videoData.authorAvatar}
                          alt={videoData.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <span className="text-muted-foreground font-medium">
                        @{videoData.author}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quality Options */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold">Select Quality</h2>
                
                {/* HD / No Watermark */}
                {videoData.videoUrlNoWatermark && (
                  <button
                    onClick={() => handleDownload(videoData.videoUrlNoWatermark, 'HD No Watermark')}
                    className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">HD Video</p>
                        <p className="text-sm text-muted-foreground">No Watermark</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                      HD
                    </span>
                  </button>
                )}

                {/* Standard Quality */}
                {videoData.videoUrl && videoData.videoUrl !== videoData.videoUrlNoWatermark && (
                  <button
                    onClick={() => handleDownload(videoData.videoUrl, 'SD')}
                    className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Video className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">Standard Video</p>
                        <p className="text-sm text-muted-foreground">With Watermark</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-bold rounded-full">
                      SD
                    </span>
                  </button>
                )}

                {/* MP3 Audio */}
                {videoData.musicUrl && (
                  <button
                    onClick={() => handleDownload(videoData.musicUrl, 'MP3')}
                    className="w-full glass-card rounded-2xl p-4 flex items-center justify-between hover:border-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Music className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">MP3 Audio</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {videoData.musicTitle || 'Original Sound'}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-secondary text-white text-sm font-bold rounded-full">
                      MP3
                    </span>
                  </button>
                )}
              </div>

              {/* Try Another */}
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full py-6 text-lg rounded-2xl"
              >
                Download Another Video
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Download CTA on Mobile */}
      {videoData && !isLoading && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border safe-area-bottom">
          <Button
            onClick={() => handleDownload(videoData.videoUrlNoWatermark || videoData.videoUrl, 'HD')}
            className="w-full btn-large btn-primary"
          >
            <Download className="h-5 w-5 mr-2" />
            Download HD Video
          </Button>
        </div>
      )}

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default DownloadPage;
