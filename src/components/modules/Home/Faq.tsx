import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: 'How do I send a parcel with SwiftParcel?',
    answer:
      "Simply create an account, fill in the sender and receiver details, choose your delivery option, and confirm your booking.A courier will pick up your parcel from your location.",
  },
  {
    question: 'How do I track my parcel?',
    answer:
      "You can track your parcel by entering the tracking number on our homepage or in the 'Track Shipment' section. You'll get real-time updates on its location and estimated delivery time.",
  },
  {
    question: 'What items are prohibited?',
    answer:
      'We cannot ship hazardous materials, illegal substances, weapons, or perishable items without special clearance. Please check our full prohibited items list in the support center.',
  },
  {
    question: 'What areas do you deliver to?',
    answer:
      'We currently operate across all major cities and districts in Bangladesh. More locations are being added regularly.',
  },
  {
    question: "What if I'm not home for delivery?",
    answer:
      "If you're not available, our courier will leave a card with instructions. You can usually reschedule delivery or pick up your parcel from a local depot.",
  },
  {
    question: 'How are shipping rates calculated?',
    answer:
      'Rates are based on the package weight, dimensions, destination, and selected service speed. You can get an instant quote using our shipping calculator.',
  },
  {
    question: 'What happens if my parcel is delayed or lost?',
    answer:
      'In case of delays, we keep you updated via SMS and email. If a parcel is lost, we provide full support and compensation as per our policy.',
  },
]
export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Can't find the answer you're looking for? Reach out to our
              customer support team.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Visit Help Center &rarr;
            </a>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 px-6"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-slate-900 dark:text-slate-50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600 dark:text-slate-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
