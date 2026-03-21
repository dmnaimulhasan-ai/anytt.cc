import { useEffect, useRef } from "react";

/**
 * Monetag MultiTag (All-in-One) - Zone: 221822
 * Official Monetag script — renders all ad formats automatically.
 */
const MonetagMultiTag = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.src = "https://quge5.com/88/tag.min.js";
    script.dataset.zone = "221822";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.head.appendChild(script);
  }, []);

  return null;
};

export default MonetagMultiTag;
