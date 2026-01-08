import { useState, useEffect } from "react";
import { Download, Music, Video, User, Clock, ArrowLeft, Flame, Loader2, ExternalLink, CheckCircle } from "lucide-react";
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

interface UnlockState {
  [key: string]: 'locked' | 'waiting' | 'unlocked';
}

const SMARTLINK_URL = 'https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd';

// Quality-based unlock delays (seconds)
const UNLOCK_DELAYS: Record<string, number> = {
  'hd': 5,       // HD is fastest (premium, no ads feel)
  'video': 15,   // SD/Standard video
  'audio': 20,   // Audio takes longest
};

const VideoResult = ({ video, onReset, platform = 'tiktok' }: VideoResultProps) => {
  const { trackDownload } = useStats();
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    filename: ''
  });
  const [unlockStates, setUnlockStates] = useState<UnlockState>({});
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const [activeUnlock, setActiveUnlock] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let skipTimeout: NodeJS.Timeout;
    
    if (activeUnlock && countdowns[activeUnlock] > 0) {
      // Show skip button after 5 seconds
      skipTimeout = setTimeout(() => {
        setShowSkip(s => ({ ...s, [activeUnlock]: true }));
      }, 5000);
      
      interval = setInterval(() => {
        setCountdowns(prev => {
          const newValue = prev[activeUnlock] - 1;
          if (newValue <= 0) {
            setUnlockStates(s => ({ ...s, [activeUnlock]: 'unlocked' }));
            setActiveUnlock(null);
            return { ...prev, [activeUnlock]: 0 };
          }
          return { ...prev, [activeUnlock]: newValue };
        });
      }, 1000);
    }

    return () => {
      if (skipTimeout) clearTimeout(skipTimeout);
      if (interval) clearInterval(interval);
    };
  }, [activeUnlock, countdowns]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUnlockClick = (buttonId: string) => {
    // Open smartlink in new tab
    window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer');
    
    // Start countdown for this button with quality-based delay
    const delay = UNLOCK_DELAYS[buttonId] || 15;
    setUnlockStates(s => ({ ...s, [buttonId]: 'waiting' }));
    setCountdowns(c => ({ ...c, [buttonId]: delay }));
    setActiveUnlock(buttonId);
    setShowSkip(s => ({ ...s, [buttonId]: false }));
  };

  const handleSkip = (buttonId: string) => {
    setUnlockStates(s => ({ ...s, [buttonId]: 'unlocked' }));
    setCountdowns(c => ({ ...c, [buttonId]: 0 }));
    setActiveUnlock(null);
    setShowSkip(s => ({ ...s, [buttonId]: false }));
  };

  const getUnlockProgress = (buttonId: string) => {
    const countdown = countdowns[buttonId] || 0;
    const maxDelay = UNLOCK_DELAYS[buttonId] || 15;
    return ((maxDelay - countdown) / maxDelay) * 100;
  };

  const handleDownload = async (url: string, filename: string) => {
    // Track the download
    trackDownload(platform, video.id);
    
    setDownloadState({ isDownloading: true, progress: 0, filename });

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        received += value.length;
        
        if (total > 0) {
          const progress = Math.round((received / total) * 100);
          setDownloadState(prev => ({ ...prev, progress }));
        } else {
          // If no content-length, show indeterminate progress
          setDownloadState(prev => ({ ...prev, progress: Math.min(prev.progress + 5, 95) }));
        }
      }

      // Combine chunks into a single Uint8Array
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
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
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

  const renderDownloadButton = (
    buttonId: string,
    url: string,
    filename: string,
    label: string,
    icon: React.ReactNode,
    isPrimary: boolean = false
  ) => {
    const state = unlockStates[buttonId] || 'locked';
    const countdown = countdowns[buttonId] || 0;
    const isThisDownloading = downloadState.isDownloading && downloadState.filename === filename;

    if (state === 'locked') {
      return isPrimary ? (
        <Button
          onClick={() => handleUnlockClick(buttonId)}
          disabled={downloadState.isDownloading || activeUnlock !== null}
          className="w-full h-13 md:h-12 btn-glow text-primary-foreground rounded-2xl border-0 text-base font-bold disabled:opacity-50"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          {label}
        </Button>
      ) : (
        <Button
          onClick={() => handleUnlockClick(buttonId)}
          disabled={downloadState.isDownloading || activeUnlock !== null}
          variant="outline"
          className="flex-1 h-12 rounded-2xl border-border/50 hover:bg-muted/50 active:scale-95 font-semibold disabled:opacity-50"
        >
          <ExternalLink className="h-4 w-4 mr-1.5" />
          {label}
        </Button>
      );
    }

    if (state === 'waiting') {
      const canSkip = showSkip[buttonId];
      return (
        <div className={`${isPrimary ? 'w-full' : 'flex-1'} p-3 rounded-2xl bg-muted/50 border border-primary/30 space-y-2`}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 animate-pulse text-primary" />
              Unlocking...
            </span>
            <span className="font-bold text-primary text-lg">{countdown}s</span>
          </div>
          <Progress value={getUnlockProgress(buttonId)} className="h-2" />
          {canSkip && (
            <Button
              onClick={() => handleSkip(buttonId)}
              variant="ghost"
              size="sm"
              className="w-full h-8 text-xs text-muted-foreground hover:text-foreground mt-1"
            >
              Skip waiting →
            </Button>
          )}
        </div>
      );
    }

    // Unlocked state
    return isPrimary ? (
      <Button
        onClick={() => handleDownload(url, filename)}
        disabled={downloadState.isDownloading}
        className="w-full h-13 md:h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl border-0 text-base font-bold disabled:opacity-50 animate-pulse"
      >
        {isThisDownloading ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            {icon}
          </>
        )}
        Download Now 🔥
      </Button>
    ) : (
      <Button
        onClick={() => handleDownload(url, filename)}
        disabled={downloadState.isDownloading}
        variant="outline"
        className="flex-1 h-12 rounded-2xl border-green-500/50 bg-green-500/10 hover:bg-green-500/20 active:scale-95 font-semibold disabled:opacity-50 text-green-500"
      >
        {isThisDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
        ) : (
          <CheckCircle className="h-4 w-4 mr-1.5" />
        )}
        {label}
      </Button>
    );
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

          {/* Download Progress */}
          {downloadState.isDownloading && (
            <div className="space-y-2 p-3 rounded-2xl bg-muted/50 border border-border/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Downloading...
                </span>
                <span className="font-semibold text-primary">{downloadState.progress}%</span>
              </div>
              <Progress value={downloadState.progress} className="h-2" />
              <p className="text-xs text-muted-foreground truncate">{downloadState.filename}</p>
            </div>
          )}

          {/* Download Buttons with Unlock Flow */}
          <div className="space-y-2.5">
            {renderDownloadButton(
              'hd',
              video.videoUrlNoWatermark,
              `tiktok-${video.id}-hd.mp4`,
              'Download HD 🔥',
              <Video className="h-5 w-5 mr-2" />,
              true
            )}
            
            <div className="flex gap-2">
              {renderDownloadButton(
                'video',
                video.videoUrl,
                `tiktok-${video.id}.mp4`,
                'Video',
                <Download className="h-4 w-4 mr-1.5" />,
                false
              )}
              
              {video.musicUrl && renderDownloadButton(
                'audio',
                video.musicUrl,
                `tiktok-${video.id}-audio.mp3`,
                'Audio',
                <Music className="h-4 w-4 mr-1.5" />,
                false
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
