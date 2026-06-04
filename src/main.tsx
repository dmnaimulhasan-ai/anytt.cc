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
    setTimeout(async () => {
      try {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });

        // Unregister any previously installed ad/monetag service workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          const scope = registration.scope || '';
          if (scope.includes('monetag') || scope.includes('/ads')) {
            await registration.unregister();
          } else {
            await registration.update();
          }
        }
      } catch (e) {
        // SW registration failed, ignore
      }
    }, 3000);
  });
}
