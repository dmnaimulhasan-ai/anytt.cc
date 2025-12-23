const AboutSection = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6">
          TikTok Video Downloader
        </h2>
        <div className="text-muted-foreground space-y-4 text-center leading-relaxed">
          <p>
            TikTok video downloader is a free online service that helps you to download TikTok videos without watermark.
            You can access it on desktop PCs, smart phones (Android, iPhone), iPad and tablets.
            and save a video as a high-definition MP4 or MP3 of the best quality.
          </p>
          <p>
            Go to TikTok app or website, copy a video URL, and paste it to the above input box. Download a video of no watermark just with a few mouse clicks.
            The service is free, and imposes no limit on number of downloads. It is easy and safe since no software installation and registration are required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
