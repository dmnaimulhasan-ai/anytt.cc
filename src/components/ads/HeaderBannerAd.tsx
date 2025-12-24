import AdPlaceholder, { ADS_ENABLED } from "./AdPlaceholder";

const HeaderBannerAd = () => {
  if (!ADS_ENABLED) return null;

  return (
    <div className="container mx-auto px-4 py-2">
      <AdPlaceholder type="header" />
    </div>
  );
};

export default HeaderBannerAd;
