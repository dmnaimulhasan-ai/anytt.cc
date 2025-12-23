const AboutSection = () => {
  return (
    <section className="py-10 md:py-12 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-3xl font-bold font-display mb-3 md:mb-4">
            TikTok <span className="gradient-text">Downloader</span>
          </h2>
          <div className="text-muted-foreground space-y-3 md:space-y-4 leading-relaxed text-sm md:text-base">
            <p>
              The ultimate free TikTok downloader 🔥 Download videos without watermark 
              on any device. Save in HD as MP4 or grab just the audio as MP3.
            </p>
            <p>
              No sketchy downloads, no sign-ups, no limits. Just paste, click, and vibe ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
