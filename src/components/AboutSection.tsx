const AboutSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <div className="glass-card rounded-3xl p-7 md:p-10 text-center relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black font-display mb-4">
              The <span className="gradient-text">best</span> TikTok downloader 💫
            </h2>
            <div className="text-muted-foreground space-y-3 text-base md:text-lg max-w-xl mx-auto">
              <p>
                Download any TikTok video without watermark in HD. 
                Works on any device - phone, tablet, or PC.
              </p>
              <p className="font-medium text-foreground">
                No sign-ups. No limits. Just vibes. ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
