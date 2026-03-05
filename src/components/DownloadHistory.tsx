import { useState } from "react";
import { Clock, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownloadHistory, DownloadHistoryItem } from "@/hooks/useDownloadHistory";
import LazyImage from "./LazyImage";

const DownloadHistory = () => {
  const { history, removeFromHistory, clearHistory } = useDownloadHistory();
  const [expanded, setExpanded] = useState(false);

  if (history.length === 0) return null;

  const displayed = expanded ? history : history.slice(0, 4);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Downloads
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-destructive text-xs"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayed.map((item) => (
            <HistoryCard key={item.id + item.downloadedAt} item={item} onRemove={removeFromHistory} formatDate={formatDate} />
          ))}
        </div>

        {history.length > 4 && (
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground"
            >
              {expanded ? (
                <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Show {history.length - 4} More <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const HistoryCard = ({ item, onRemove, formatDate }: { 
  item: DownloadHistoryItem; 
  onRemove: (id: string) => void;
  formatDate: (iso: string) => string;
}) => (
  <div className="group relative glass-card rounded-xl overflow-hidden">
    <div className="relative aspect-[9/16] max-h-[180px]">
      <LazyImage
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full"
      />
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove"
      >
        <X className="h-3 w-3" />
      </button>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white text-xs font-medium line-clamp-2 leading-tight">{item.title}</p>
        <p className="text-white/60 text-[10px] mt-0.5">{formatDate(item.downloadedAt)}</p>
      </div>
    </div>
  </div>
);

export default DownloadHistory;
