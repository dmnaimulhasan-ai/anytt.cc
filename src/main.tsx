import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

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
