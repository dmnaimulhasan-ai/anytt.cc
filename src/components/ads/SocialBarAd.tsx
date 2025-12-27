import { useEffect } from 'react';

const SocialBarAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://evadereprimand.com/13/1f/7e/131f7e3177dc9a9d1eef72bf2f23cd59.js';
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

export default SocialBarAd;
