import { ADS_ENABLED } from "./AdPlaceholder";

const HeaderBannerAd = () => {
  if (!ADS_ENABLED) return null;

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-center h-16 bg-muted/20 rounded-xl overflow-hidden">
        {/* PropellerAds will inject banner ads via the scripts in index.html */}
        <div id="propeller-header-ad" className="w-full h-full" />
      </div>
    </div>
  );
};

export default HeaderBannerAd;
