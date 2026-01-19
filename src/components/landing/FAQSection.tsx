import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I convert my Nigerian grades to ECTS?",
      answer: "Simply select Nigeria as your country, choose your university from our list of 273+ NUC-approved institutions, enter your grade (percentage, GPA, or class like '2:1'), and click convert. You'll instantly see your ECTS equivalent with full calculation details."
    },
    {
      question: "Is the ECTS grade converter free to use?",
      answer: "Yes! Grades to ECTS is 100% free for all basic conversions. There are no hidden fees, no registration required, and no limits on how many grades you can convert. Premium features like PDF export and bulk conversion may be added in the future."
    },
    {
      question: "How accurate is the grade conversion?",
      answer: "Our conversions use the Modified Bavarian Formula and institution-specific grading scales. We show the complete calculation methodology so you and admissions officers can verify the accuracy. Our system is aligned with international credential evaluation standards."
    },
    {
      question: "What is ECTS and why do I need it?",
      answer: "ECTS (European Credit Transfer and Accumulation System) is the standard grading system used by all universities in the European Higher Education Area. If you're applying to European universities, your grades need to be converted to ECTS format for admissions committees to understand your academic performance."
    },
    {
      question: "Which African countries and universities are supported?",
      answer: "We currently support 54+ African countries including Nigeria (273+ universities), Ghana, Kenya, South Africa, Egypt, Morocco, and more. Our database includes federal, state, and private universities with their specific grading scales."
    },
    {
      question: "Can I convert my entire transcript or multiple courses?",
      answer: "Yes! Use our Cumulative GPA Calculator to convert all your courses at once. Enter each semester's grades and weights, and we'll calculate your overall ECTS GPA. This is perfect for graduate school applications requiring transcript conversion."
    },
    {
      question: "How does a Nigerian 2:1 (Second Class Upper) convert to ECTS?",
      answer: "A Nigerian Second Class Upper (2:1) typically ranges from 60-69% and converts to approximately ECTS grade B or C, depending on your exact percentage and university scale. Our converter shows the precise calculation based on your specific institution."
    },
    {
      question: "Will European universities accept this conversion?",
      answer: "Our conversion methodology follows internationally recognized standards. Many students have successfully used our conversions in their applications. We provide detailed calculation breakdowns that admissions officers can verify, adding credibility to your application."
    },
    {
      question: "What's the difference between ECTS credits and ECTS grades?",
      answer: "ECTS credits measure workload (60 credits = 1 academic year), while ECTS grades (A-F) measure performance. Our converter focuses on grade conversion, translating your academic performance from African grading systems to the European grade scale."
    },
    {
      question: "How do I calculate my cumulative ECTS GPA?",
      answer: "Use our Cumulative GPA Calculator tab. Select your university, enter your program details (years and semesters), then input each semester's GPA and credit hours. We'll calculate your weighted average and convert it to an overall ECTS grade."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about converting African grades to ECTS
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Support CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <a 
                href="mailto:support@gradestoects.com" 
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
