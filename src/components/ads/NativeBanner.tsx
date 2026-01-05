import { useEffect } from "react";

const NativeBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://evadereprimand.com/3025235b7f9e8922019d79a8dd0ff449/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.getElementById("container-3025235b7f9e8922019d79a8dd0ff449")?.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div id="container-3025235b7f9e8922019d79a8dd0ff449"></div>
    </div>
  );
};

export default NativeBanner;
