import { useEffect } from 'react';

const PopunderAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://evadereprimand.com/70/c8/f6/70c8f649de73ffde3e37b4927c8ba5a4.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default PopunderAd;
