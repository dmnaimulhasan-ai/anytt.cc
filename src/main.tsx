import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Mark fonts loaded to swap from system fonts to Inter
if (document.fonts) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
} else {
  // Fallback: assume fonts loaded after 1s
  setTimeout(() => document.documentElement.classList.add('fonts-loaded'), 1000);
}

// Defer service worker registration to avoid render-blocking
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register SW after page load to improve FCP/LCP
    setTimeout(async () => {
      try {
        // Register the service worker
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        
        // Update existing registrations
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.update();
        }
      } catch (e) {
        // SW registration failed, ignore
      }
    }, 3000); // 3s delay to prioritize content rendering
  });
}
