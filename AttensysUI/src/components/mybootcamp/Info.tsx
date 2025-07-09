import React from "react";
import Image from "next/image";
import avatar from "@/assets/profile_pic.png";
import { RiShieldUserLine } from "react-icons/ri";

const Info = (props: any) => {
  const { wallet } = props;

  const formatHexString = (hex: string): string => {
    if (!hex) return "";

    // Check if hex starts with 0x and has sufficient length
    if (hex.startsWith("0x") && hex.length >= 10) {
      const firstPart = hex.slice(0, 8); // Gets "0x057782"
      const lastPart = hex.slice(-6); // Gets "bd0488"
      return `${firstPart}....${lastPart}`;
    }

    return hex; // Return original if it doesn't match expected format
  };
  return (
    <div className="h-auto py-6 w-ful">
      <div className="h-[100px] w-[90%] sm:w-[80%] mx-auto flex flex-col space-x-0 space-y-4 items-start justify-start lg:flex-row lg:space-x-4 lg:space-y-0 lg:items-center lg:justify-between">
        <div className="flex space-x-3 items-center">
          <div className="h-[40px] w-[40px] sm:h-[77px] sm:w-[77px] rounded-full border-[1px]">
            <Image
              src={avatar}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-[#5801A9] text-md sm:text-xl leading-[22px]">
              vladanirocks@gmail.com
            </h1>
            <p className="font-light text-xs sm:text-sm text-[#2D3A4B] leading-[16px]">
              vladanirocks@gmail.com
            </p>
          </div>
        </div>

        <div className="py-2.5 w-full max-w-[380px] border-[1px] border-[#6B6D6E] flex items-center space-x-1 justify-center rounded-xl">
          <RiShieldUserLine />
          <h1 className="text-[12px] sm:text-[14px] text-[#2D3A4B] font-medium">
            Status : Student{" "}
            <span className="text-[#5801A9]">
              {formatHexString(wallet?.selectedAddress)}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Info;
