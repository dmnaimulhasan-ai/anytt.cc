import { useState } from "react";
import { Download, Music, ArrowLeft, Loader2, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  filename: string;
}

/**
 * Video Result Component - Mobile First Clean Design
 * Large buttons, clear layout, instant downloads
 */
const VideoResult = ({ video, onReset, platform = 'tiktok' }: VideoResultProps) => {
  const { trackDownload } = useStats();
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    filename: ''
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = async (url: string, filename: string) => {
    trackDownload(platform, video.id);
    setDownloadState({ isDownloading: true, progress: 0, filename });

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        chunks.push(value);
        received += value.length;
        
        if (total > 0) {
          setDownloadState(prev => ({ ...prev, progress: Math.round((received / total) * 100) }));
        } else {
          setDownloadState(prev => ({ ...prev, progress: Math.min(prev.progress + 5, 95) }));
        }
      }

      const blob = new Blob(chunks as BlobPart[]);
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(blobUrl);
      setDownloadState({ isDownloading: false, progress: 100, filename: '' });
    } catch {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadState({ isDownloading: false, progress: 0, filename: '' });
    }
  };

  const isDownloadingFile = (filename: string) => 
    downloadState.isDownloading && downloadState.filename === filename;

  return (
    <div className="glass-card rounded-3xl p-6 max-w-md mx-auto">
      {/* Video Preview - Centered */}
      <div className="relative mb-6">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-2xl bg-muted"
        />
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Play className="h-3.5 w-3.5 fill-current" />
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-muted-foreground">@{video.author}</p>
      </div>

      {/* Download Progress */}
      {downloadState.isDownloading && (
        <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Downloading...
            </span>
            <span className="font-bold text-primary">{downloadState.progress}%</span>
          </div>
          <Progress value={downloadState.progress} className="h-2" />
        </div>
      )}

      {/* Download Buttons - Large and Clear */}
      <div className="space-y-3">
        {/* HD Download - Primary Action */}
        <Button
          onClick={() => handleDownload(video.videoUrlNoWatermark, `${platform}-${video.id}-hd.mp4`)}
          disabled={downloadState.isDownloading}
          className="w-full h-14 text-lg font-bold rounded-2xl btn-primary"
        >
          {isDownloadingFile(`${platform}-${video.id}-hd.mp4`) ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <CheckCircle className="h-5 w-5 mr-2" />
          )}
          Download HD Video
        </Button>
        
        {/* Audio Download - Secondary */}
        {video.musicUrl && (
          <Button
            onClick={() => handleDownload(video.musicUrl, `${platform}-${video.id}-audio.mp3`)}
            disabled={downloadState.isDownloading}
            variant="outline"
            className="w-full h-12 text-base font-semibold rounded-2xl border-2"
          >
            {isDownloadingFile(`${platform}-${video.id}-audio.mp3`) ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Music className="h-4 w-4 mr-2" />
            )}
            Download Audio Only
          </Button>
        )}

        {/* Reset - Tertiary */}
        <Button
          onClick={onReset}
          variant="ghost"
          className="w-full h-11 text-muted-foreground hover:text-foreground rounded-2xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Download another video
        </Button>
      </div>
    </div>
  );
};

export default VideoResult;
