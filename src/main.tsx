import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Unregister old service workers and clear all caches to fix offline page issue
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Clear ALL caches to prevent offline page from showing
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Update all service worker registrations
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.update();
      }
    } catch (e) {
      // Ignore errors
    }
  });
}
