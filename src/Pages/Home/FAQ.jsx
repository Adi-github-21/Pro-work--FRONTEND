import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (id) => {
    setOpenIndex(prev => (prev === id ? null : id));
  };

  const faqData = [
    {
      id: 1,
      question: "What if I’m not satisfied with the services?",
      answer:
        "To provide you the desired quality of work, we have a ‘satisfactory replacement policy’. Just reach out to customer support with a valid reason and we’ll assist you with a new service provider."
    },
    {
      id: 2,
      question: "I have done the payment but the booking is not showing?",
      answer:
        "If your payment went through, wait for half an hour — your booking should update. If not, please contact customer support."
    },
    {
      id: 3,
      question: "What are the services we provide here?",
      answer:
        "ProWork offers 8+ household services including housemaid, electrician, priest, and more. All service providers are experienced and vetted."
    },
    {
      id: 4,
      question: "What are the timings to book the services?",
      answer:
        "You can book any available service between 9:00 A.M. to 9:00 P.M. — we operate on a 12-hour booking window."
    },
    {
      id: 5,
      question: "Is it safe to hire a person from ProWork?",
      answer:
        "Absolutely. All our service providers are Aadhaar-verified to ensure your safety and trust."
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="mx-auto max-w-7xl border border-[#33806b]/20 p-6 md:p-10 rounded-2xl shadow-sm bg-white">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#33806b] leading-tight mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#f2da1d] mx-auto rounded-full" />
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqData.map(({ id, question, answer }) => {
            const isOpen = openIndex === id;
            return (
              <div
                key={id}
                className="border border-[#33806b]/30 rounded-xl overflow-hidden shadow-sm transition hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(id)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left text-[#33806b] font-medium hover:bg-[#f2da1d]/10 transition"
                >
                  <span className="text-lg">{question}</span>
                  <span
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-[#33806b]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 12H18M12 6V18"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`px-5 overflow-hidden text-[#444] transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] py-4" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ
