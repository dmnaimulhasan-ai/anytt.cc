import { useState } from "react";
import { Download, Music, Video, User, Clock, ArrowLeft, Flame, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStats } from "@/hooks/useStats";

interface VideoData {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  musicUrl: string;
  musicTitle: string;
}

interface VideoResultProps {
  video: VideoData;
  onReset: () => void;
  platform?: string;
}

type DownloadType = 'hd' | 'video' | 'audio' | null;

const VideoResult = ({ video, onReset, platform = 'tiktok' }: VideoResultProps) => {
  const { trackDownload } = useStats();
  const [downloading, setDownloading] = useState<DownloadType>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = async (url: string, filename: string, type: DownloadType) => {
    // Track the download
    trackDownload(platform, video.id);
    setDownloading(type);
    
    try {
      // Fetch the file as a blob for proper download
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to opening in new tab if blob download fails
      window.open(url, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto glass-card rounded-3xl p-5 md:p-6 animate-bounce-in neon-border">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl" />
          <img
            src={video.thumbnail}
            alt={video.title}
            className="relative w-36 sm:w-40 h-48 sm:h-56 object-cover rounded-2xl border-2 border-border/30"
          />
          <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs flex items-center gap-1 text-foreground font-medium">
            <Clock className="h-3 w-3" />
            {formatDuration(video.duration)}
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full text-xs flex items-center gap-1 text-primary-foreground font-bold shadow-neon">
            <Flame className="h-3 w-3" />
            HD
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 text-left">
          <div>
            <h3 className="text-base font-bold text-foreground line-clamp-2 font-display leading-tight">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">@{video.author}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <Music className="h-4 w-4 text-secondary" />
              <span className="text-sm truncate">{video.musicTitle}</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-2.5">
            <Button
              onClick={() => handleDownload(video.videoUrlNoWatermark, `tiktok-${video.id}-hd.mp4`, 'hd')}
              className="w-full h-13 md:h-12 btn-glow text-primary-foreground rounded-2xl border-0 text-base font-bold"
              disabled={downloading !== null}
            >
              {downloading === 'hd' ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Video className="h-5 w-5 mr-2" />
              )}
              {downloading === 'hd' ? 'Downloading...' : 'Download HD 🔥'}
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleDownload(video.videoUrl, `tiktok-${video.id}.mp4`, 'video')}
                variant="outline"
                className="flex-1 h-12 rounded-2xl border-border/50 hover:bg-muted/50 active:scale-95 font-semibold"
                disabled={downloading !== null}
              >
                {downloading === 'video' ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-1.5" />
                )}
                {downloading === 'video' ? 'Downloading...' : 'Video'}
              </Button>
              
              {video.musicUrl && (
                <Button
                  onClick={() => handleDownload(video.musicUrl, `tiktok-${video.id}-audio.mp3`, 'audio')}
                  variant="outline"
                  className="flex-1 h-12 rounded-2xl border-border/50 hover:bg-muted/50 active:scale-95 font-semibold"
                  disabled={downloading !== null}
                >
                  {downloading === 'audio' ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Music className="h-4 w-4 mr-1.5" />
                  )}
                  {downloading === 'audio' ? 'Downloading...' : 'Audio'}
                </Button>
              )}
            </div>
          </div>

          <Button
            onClick={onReset}
            variant="ghost"
            className="w-full h-11 text-muted-foreground hover:text-foreground active:scale-95 rounded-2xl font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Download another
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
