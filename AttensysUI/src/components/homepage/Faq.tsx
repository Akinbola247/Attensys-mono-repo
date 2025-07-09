import React, { useState } from "react";
import faqsearch from "@/assets/faqsearch.svg";
import Image from "next/image";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How secure are the issues certificates?",
      answer:
        "AttenSys uses blockchain technology to ensure all certificates are tamper-proof and verifiable. Each certificate is an nft a unique digital fingerprint stored on the blockchain.",
    },
    {
      question: "How do I verify a certificate?",
      answer:
        "Simply head over to explorer, paste in the address to instantly confirm the certificates the address holds.",
    },
    {
      question: "Can I sell my courses on AttenSys?",
      answer:
        "Yes! Educators and content creators can easily list their courses and leverage our STRK-powered payment system for secure transactions.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Cryptocurrency payments through our STRK. Only the STRK token is accepted for transactions on the platform.",
    },
    {
      question: "How does the attendance tracking work?",
      answer:
        "Our system automatically records participant engagement through digital check-ins and activity monitoring during sessions.",
    },
  ];

  const toggleFaq = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#2D3A4B] py-12 mt-16">
      {/* Desktop FAQ */}
      <div className="hidden lg:flex lg:h-auto w-full flex-col py-12">
        <div className="w-[896px] mx-auto">
          <h1 className="font-bold text-[34px] text-[#FFFFFF] text-center">
            FAQ
          </h1>
          <p className="text-[18px] text-[#BCBCBC] font-semibold pb-10 text-center">
            Frequently Asked Questions
          </p>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-[894px] border-[#C3C3C3] border rounded-xl mb-6 overflow-hidden"
            >
              <div
                className="w-full flex space-x-4 px-8 cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <Image alt="icon" src={faqsearch} />
                <div className="flex-1">
                  <h1 className="py-5 text-[#BCBCBC] text-[18px]">
                    {faq.question}
                  </h1>
                  {activeIndex === index && (
                    <div className="pb-5 text-[#FFFFFF] text-[16px]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile FAQ */}
      <div className="lg:hidden w-full px-6 py-12 text-center">
        <h1 className="font-bold text-[28px] text-[#FFFFFF] pb-4">FAQ</h1>
        <p className="text-[16px] text-[#BCBCBC] font-semibold pb-6">
          Frequently Asked Questions
        </p>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full border-[#C3C3C3] border rounded-lg mb-6 overflow-hidden bg-[#334155]"
          >
            <div
              className="w-full p-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center space-x-4">
                <Image alt="icon" src={faqsearch} width={20} height={20} />
                <h1 className="text-[#FFFFFF] text-[16px]">{faq.question}</h1>
              </div>
              {activeIndex === index && (
                <div className="mt-3 text-[#BCBCBC] text-[14px] text-left pl-9">
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
