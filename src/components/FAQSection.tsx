import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "Is it really free to use?",
    answer: "Yes, Anytt.cc is completely free. No hidden fees, no subscriptions, no limits on downloads. Download as many videos as you want."
  },
  {
    question: "Do I need to install an app?",
    answer: "No installation needed. Just open Anytt.cc in your browser, paste your video link, and download directly to your device."
  },
  {
    question: "What video quality is available?",
    answer: "We provide HD quality downloads without watermark. The quality depends on the original video uploaded to TikTok or Facebook."
  },
  {
    question: "Does it work on iPhone?",
    answer: "Yes! Anytt.cc works on iPhone, iPad, Android phones and tablets, and all desktop browsers including Chrome, Safari, and Firefox."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We don't store your videos or any personal data. Downloads are processed securely and we don't require any registration."
  }
];

/**
 * FAQ Section - Accordion style
 * Clean, readable, mobile-friendly
 */
const FAQSection = ({ faqs = defaultFaqs }: FAQSectionProps) => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-section text-center mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Got questions? We've got answers.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card rounded-2xl border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-base font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
