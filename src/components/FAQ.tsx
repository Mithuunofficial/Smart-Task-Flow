import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How does the AI prioritize my tasks?",
      answer: "The AI engine analyzes natural language in your task titles, details, deadlines, and project scope. It cross-references this with your historical task completion rates, available calendar slots, and your selected energy level to establish priority rankings."
    },
    {
      question: "Is my task data secure and private?",
      answer: "Absolutely. We encrypt all data in transit and at rest using standard AES-256 protocols. Your schedules and personal analytics are private to you, and we do not sell or share your information with any third-party advertisers."
    },
    {
      question: "Can I integrate Smart Task Flow with my existing tools?",
      answer: "Yes! Smart Task Flow supports direct integration with Google Calendar, Outlook, Slack, GitHub, Notion, and Todoist. Your schedules will automatically stay in sync across all external profiles."
    },
    {
      question: "Do you offer a free plan?",
      answer: "Yes, our 'Started Free' plan offers complete core features, including basic AI task prioritization, standard habit tracking, and local Pomodoro focus blocks. Pro plans add infinite calendar integrations and deep contextual recommendations."
    },
    {
      question: "How does the Pomodoro timer integrate with AI suggestions?",
      answer: "When you run a focus block, the timer tracks active attention sessions. If you complete blocks or experience fatigue, the AI notices these patterns and alters your suggestion suggestions, prompting you for recovery breaks or recommending lighter tasks."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-dot-pattern border-t border-white/5" id="faq">
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-brand-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Find answers to common questions about our platform and AI engine capabilities.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-colors duration-300 hover:border-white/10"
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-purple' : ''
                  }`} />
                </button>

                {/* Answer Collapsible Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 border-t border-white/5 pt-4">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
