const AboutSection = () => {
  return (
    <section className="py-12 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-3xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
            TikTok Video <span className="gradient-text">Downloader</span>
          </h2>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p>
              The ultimate free TikTok video downloader that actually slaps 🔥 Download videos without watermark 
              on any device — phone, tablet, or PC. Save in HD quality as MP4 or grab just the audio as MP3.
            </p>
            <p>
              No sketchy downloads, no sign-ups, no limits. Just paste, click, and vibe. 
              It's the tool you didn't know you needed but now can't live without ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
