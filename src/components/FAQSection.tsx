import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How to download a TikTok video to Android phone?",
    answer: "Open the TikTok app or website on your phone and locate your target video. Tap the Share button at the right bottom of the video and click on the Copy Link to save the video URL. Paste this URL to the input box above. Click on the Search button to grab it.",
  },
  {
    question: "How to download a TikTok video to iPhone/iPad?",
    answer: "The operation procedure is different depending on the OS version and device types. For iOS 13+, you can directly download videos. For older versions, you may need a third-party app like Documents by Readdle to download and save videos to your camera roll.",
  },
  {
    question: "Is it free to use this TikTok downloader?",
    answer: "Yes, our TikTok video downloader is completely free to use. There are no hidden charges or subscription fees. You can download unlimited TikTok videos without any cost.",
  },
  {
    question: "Can I download TikTok videos without watermark?",
    answer: "Yes! Our service specifically removes the TikTok watermark from downloaded videos. You'll get clean, high-quality videos without any watermarks or logos.",
  },
  {
    question: "What video formats are supported?",
    answer: "We support MP4 video format for video downloads and MP3 format for audio-only downloads. The videos are saved in high definition quality to ensure the best viewing experience.",
  },
  {
    question: "Is it safe to use this website?",
    answer: "Absolutely! Our website is secure and doesn't require any software installation or user registration. We don't store any of your data or downloaded videos. Your privacy and security are our top priorities.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-primary rounded-t-xl py-6 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="bg-card rounded-b-xl shadow-medium">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 text-primary font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
