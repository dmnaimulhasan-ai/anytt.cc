import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Force service worker update and clear old caches on load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        // Force update check
        await registration.update();
      }
      
      // Clear old caches that might have stale UI
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => name.includes('workbox') || name.includes('static'))
            .map(name => caches.delete(name))
        );
      }
    } catch (e) {
      // Ignore errors
    }
  });
}
