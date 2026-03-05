import { useState, useCallback } from "react";
import { Search, User, Loader2, Download, CheckSquare, Square, Play, Heart, MessageCircle, Eye, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import { useStats } from "@/hooks/useStats";
import LazyImage from "./LazyImage";

interface ProfileVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  musicUrl: string;
  plays: number;
  likes: number;
  comments: number;
}

interface ProfileData {
  username: string;
  nickname: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  videos: ProfileVideo[];
  totalVideos: number;
}

const formatCount = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};

const formatDuration = (s: number) => {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, '0')}`;
};

const ProfileDownloader = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { addToHistory } = useDownloadHistory();
  const { trackDownload } = useStats();

  const fetchProfile = async () => {
    const clean = username.trim().replace(/^@/, '');
    if (!clean) {
      toast({ title: "Username required", description: "Enter a TikTok username", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setProfile(null);
    setSelected(new Set());

    try {
      const { data, error } = await supabase.functions.invoke('tiktok-profile', {
        body: { username: clean }
      });

      if (error || !data?.success) {
        toast({ title: "❌ Failed", description: data?.error || "Could not fetch profile", variant: "destructive" });
      } else {
        setProfile(data.data);
        toast({ title: "🎉 Profile loaded!", description: `Found ${data.data.videos.length} videos` });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }

    setIsLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (!profile) return;
    if (selected.size === profile.videos.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(profile.videos.map(v => v.id)));
    }
  };

  const downloadVideo = useCallback(async (video: ProfileVideo) => {
    setDownloading(prev => new Set(prev).add(video.id));
    trackDownload('tiktok', video.id);
    addToHistory({
      id: video.id,
      title: video.title,
      author: profile?.username || '',
      thumbnail: video.thumbnail,
      platform: 'tiktok',
      videoUrl: video.videoUrlNoWatermark || video.videoUrl,
    });

    try {
      const url = video.videoUrlNoWatermark || video.videoUrl;
      const link = document.createElement('a');
      link.href = url;
      link.download = `tiktok-${video.id}.mp4`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // fallback
    }

    setTimeout(() => {
      setDownloading(prev => {
        const next = new Set(prev);
        next.delete(video.id);
        return next;
      });
    }, 1000);
  }, [profile, trackDownload, addToHistory]);

  const downloadSelected = async () => {
    if (!profile || selected.size === 0) return;
    const videos = profile.videos.filter(v => selected.has(v.id));
    
    for (let i = 0; i < videos.length; i++) {
      await downloadVideo(videos[i]);
      if (i < videos.length - 1) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    window.dispatchEvent(new Event('anytt:download-complete'));
    toast({ title: "🎊 Done!", description: `Downloaded ${videos.length} videos` });
  };

  const handleReset = () => {
    setProfile(null);
    setUsername("");
    setSelected(new Set());
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!profile ? (
        // Search UI
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground mb-6">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">Profile Downloader • Batch Download</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black font-display mb-4">
            <span className="gradient-text">TikTok Profile</span>
            <span className="text-foreground"> Downloader</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Enter a username to see all their videos and download in batch
          </p>

          {/* Input */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-3 md:hidden">
              <div className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-border/30">
                <span className="text-muted-foreground font-bold">@</span>
                <Input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchProfile()}
                  className="border-0 bg-transparent focus-visible:ring-0 text-foreground text-base h-10"
                />
              </div>
              <Button
                onClick={fetchProfile}
                disabled={isLoading}
                className="rounded-2xl h-14 btn-glow text-primary-foreground border-0 text-base font-bold"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
                {isLoading ? 'Loading...' : 'Find Videos'}
              </Button>
            </div>

            <div className="hidden md:flex glass-card rounded-full p-2 items-center gap-2 border border-border/30">
              <div className="flex-1 flex items-center gap-2 pl-5">
                <span className="text-muted-foreground font-bold text-lg">@</span>
                <Input
                  placeholder="Enter TikTok username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchProfile()}
                  className="border-0 bg-transparent focus-visible:ring-0 text-foreground text-lg"
                />
              </div>
              <Button
                onClick={fetchProfile}
                disabled={isLoading}
                className="rounded-full h-12 btn-glow text-primary-foreground px-8 border-0 font-bold text-base"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
                {isLoading ? 'Loading...' : 'Find Videos'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Profile Results
        <div className="animate-fade-in">
          {/* Profile Header */}
          <div className="glass-card rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              {profile.avatar && (
                <img src={profile.avatar} alt={profile.nickname} className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground truncate">{profile.nickname}</h3>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>
              <Button variant="ghost" onClick={handleReset} className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
            <div className="flex gap-6 text-sm">
              <div><span className="font-bold text-foreground">{formatCount(profile.followers)}</span> <span className="text-muted-foreground">Followers</span></div>
              <div><span className="font-bold text-foreground">{formatCount(profile.following)}</span> <span className="text-muted-foreground">Following</span></div>
              <div><span className="font-bold text-foreground">{formatCount(profile.likes)}</span> <span className="text-muted-foreground">Likes</span></div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={selectAll} className="rounded-xl text-xs">
                {selected.size === profile.videos.length ? (
                  <><CheckSquare className="h-3.5 w-3.5 mr-1" /> Deselect All</>
                ) : (
                  <><Square className="h-3.5 w-3.5 mr-1" /> Select All ({profile.videos.length})</>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            </div>
            {selected.size > 0 && (
              <Button onClick={downloadSelected} className="rounded-xl btn-primary text-sm font-bold">
                <Download className="h-4 w-4 mr-1" />
                Download {selected.size} Videos
              </Button>
            )}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {profile.videos.map(video => (
              <div
                key={video.id}
                className={`group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all ${
                  selected.has(video.id) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                }`}
                onClick={() => toggleSelect(video.id)}
              >
                <div className="relative aspect-[9/16]">
                  <LazyImage src={video.thumbnail} alt={video.title} className="w-full h-full" />
                  
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    {selected.has(video.id) ? (
                      <CheckSquare className="h-6 w-6 text-primary drop-shadow-lg" />
                    ) : (
                      <Square className="h-6 w-6 text-white/70 drop-shadow-lg group-hover:text-white" />
                    )}
                  </div>

                  {/* Duration */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded-lg text-xs font-semibold">
                    {formatDuration(video.duration)}
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-medium line-clamp-2 leading-tight mb-1.5">{video.title}</p>
                    <div className="flex items-center gap-3 text-white/70 text-[10px]">
                      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{formatCount(video.plays)}</span>
                      <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{formatCount(video.likes)}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="h-3 w-3" />{formatCount(video.comments)}</span>
                    </div>
                  </div>

                  {/* Individual download */}
                  <button
                    onClick={(e) => { e.stopPropagation(); downloadVideo(video); }}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Download video"
                  >
                    {downloading.has(video.id) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {profile.videos.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No public videos found for this user.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDownloader;
