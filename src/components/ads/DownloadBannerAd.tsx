import { ADS_ENABLED } from "./AdPlaceholder";

const DownloadBannerAd = () => {
  if (!ADS_ENABLED) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="flex items-center justify-center h-24 md:h-28 bg-muted/20 rounded-xl overflow-hidden">
        {/* PropellerAds will inject banner ads via the scripts in index.html */}
        <div id="propeller-download-ad" className="w-full h-full" />
      </div>
    </div>
  );
};

export default DownloadBannerAd;
