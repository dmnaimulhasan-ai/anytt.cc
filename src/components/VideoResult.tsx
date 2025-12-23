import { Download, Music, Video, User, Clock, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
}

const VideoResult = ({ video, onReset }: VideoResultProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 animate-slide-up neon-border">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-32 sm:w-40 md:w-48 h-44 sm:h-56 md:h-64 object-cover rounded-xl md:rounded-2xl"
          />
          <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs flex items-center gap-1 text-foreground">
            <Clock className="h-3 w-3" />
            {formatDuration(video.duration)}
          </div>
          <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-accent px-2 py-1 rounded-lg text-xs flex items-center gap-1 text-primary-foreground font-medium">
            <Sparkles className="h-3 w-3" />
            HD
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3 md:space-y-4 text-left">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2 font-display">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm">@{video.author}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <Music className="h-4 w-4 text-secondary" />
              <span className="text-sm truncate">{video.musicTitle}</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => handleDownload(video.videoUrlNoWatermark, `tiktok-${video.id}-hd.mp4`)}
              className="w-full h-12 md:h-10 btn-glow text-primary-foreground rounded-xl border-0 text-base md:text-sm font-semibold"
            >
              <Video className="h-5 w-5 mr-2" />
              Download HD ✨
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleDownload(video.videoUrl, `tiktok-${video.id}.mp4`)}
                variant="outline"
                className="flex-1 h-11 md:h-10 rounded-xl border-border/50 hover:bg-muted/50 active:bg-muted"
              >
                <Download className="h-4 w-4 mr-1" />
                Video
              </Button>
              
              {video.musicUrl && (
                <Button
                  onClick={() => handleDownload(video.musicUrl, `tiktok-${video.id}-audio.mp3`)}
                  variant="outline"
                  className="flex-1 h-11 md:h-10 rounded-xl border-border/50 hover:bg-muted/50 active:bg-muted"
                >
                  <Music className="h-4 w-4 mr-1" />
                  Audio
                </Button>
              )}
            </div>
          </div>

          <Button
            onClick={onReset}
            variant="ghost"
            className="w-full h-11 md:h-10 text-muted-foreground hover:text-foreground active:bg-muted/50 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Download Another
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
