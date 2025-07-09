import React from "react";
import Image from "next/image";
import grad from "@/assets/grad.svg";
import book from "@/assets/book.svg";
import badge from "@/assets/badge.svg";

const Cardsection = () => {
  const data = [
    {
      icon: grad,
      header: "Buy Course",
      paragraph:
        "Purchase top-tier courses with STRK, grow, and track progress",
    },
    {
      icon: book,
      header: "Sell course",
      paragraph:
        "Monetize your expertise by listing your courses on Attensy. Set your price and earn STRK.",
    },
    {
      icon: badge,
      header: "Quality Certification",
      paragraph:
        "Earn blockchain-verified certifications—globally recognized and tamper-proof credentials.",
    },
  ];

  return (
    <div className="mt-4 sm:mt-10 md:mt-12 w-[90%] md:w-[80%] sm:w-[80%] sm:pb-10 lg:w-[90%] mx-auto flex flex-col sm:flex-col md:flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 md:gap-8 sm:px-6 md:px-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="w-full sm:w-[424px] md:w-full lg:w-[30%] h-auto bg-[#FFFFFF] rounded-xl shadow-lg flex flex-col sm:flex-row md:flex-col justify-center items-center sm:space-x-4 md:space-x-0 p-6 md:p-8"
        >
          <Image
            alt="icon"
            src={item?.icon}
            className="size-6 text-[#9747FF] w-[46px] h-[46px] my-auto"
          />
          <div className="space-y-2 sm:w-[270px] md:w-full text-center sm:text-left md:text-center">
            <h1 className="text-[18px] text-[#2D3A4B] font-bold">
              {item.header}
            </h1>
            <p className="text-[14px] text-[#2D3A4B] font-light">
              {item.paragraph}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cardsection;
