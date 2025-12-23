import { Download, Music, Video, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="max-w-2xl mx-auto p-6 bg-card shadow-large animate-slide-up">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full md:w-48 h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2 bg-foreground/80 text-background px-2 py-1 rounded text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(video.duration)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="text-sm">@{video.author}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <Music className="h-4 w-4" />
              <span className="text-sm truncate">{video.musicTitle}</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => handleDownload(video.videoUrlNoWatermark, `tiktok-${video.id}-hd.mp4`)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Video className="h-4 w-4 mr-2" />
              Download HD (No Watermark)
            </Button>
            
            <Button
              onClick={() => handleDownload(video.videoUrl, `tiktok-${video.id}.mp4`)}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Video
            </Button>
            
            {video.musicUrl && (
              <Button
                onClick={() => handleDownload(video.musicUrl, `tiktok-${video.id}-audio.mp3`)}
                variant="outline"
                className="w-full"
              >
                <Music className="h-4 w-4 mr-2" />
                Download Audio (MP3)
              </Button>
            )}
          </div>

          <Button
            onClick={onReset}
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Download Another Video
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoResult;
