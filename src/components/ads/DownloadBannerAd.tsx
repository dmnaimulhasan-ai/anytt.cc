import AdPlaceholder, { ADS_ENABLED } from "./AdPlaceholder";

const DownloadBannerAd = () => {
  if (!ADS_ENABLED) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <AdPlaceholder type="banner" />
    </div>
  );
};

export default DownloadBannerAd;
