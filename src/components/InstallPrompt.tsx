import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed recently
    const lastDismissed = localStorage.getItem('pwa_install_dismissed');
    if (lastDismissed && Date.now() - parseInt(lastDismissed) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Show prompt after a successful download (listen for custom event)
  useEffect(() => {
    const onDownloadComplete = () => {
      if (deferredPrompt && !dismissed) {
        setTimeout(() => setShow(true), 2000);
      }
    };

    window.addEventListener('anytt:download-complete', onDownloadComplete);
    return () => window.removeEventListener('anytt:download-complete', onDownloadComplete);
  }, [deferredPrompt, dismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 animate-in slide-in-from-bottom-4">
      <div className="glass-card rounded-2xl p-4 border border-primary/20 shadow-lg">
        <button onClick={handleDismiss} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-foreground">Add to Home Screen</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quick access to downloads — works offline!
            </p>
            <Button
              onClick={handleInstall}
              size="sm"
              className="mt-2 h-8 text-xs rounded-xl btn-primary w-full"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Install App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
