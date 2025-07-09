import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { format } from "date-fns";

interface Notification {
  type: string;
  bootcampId: string;
  timestamp: string;
  blockNumber: string;
}

const Notifycard = ({ notification }: { notification: Notification }) => {
  const formatTimestamp = (timestamp: number) => {
    // Convert from seconds to milliseconds if needed
    const date = new Date(timestamp * 1000);
    return format(date, "MMM dd, yyyy HH:mm:ss");
  };

  const getNotificationContent = () => {
    switch (notification.type) {
      case "ORGANIZATION_APPROVED":
        return {
          icon: (
            <MdVerified className="h-[32px] w-[32px] flex-none text-green-600" />
          ),
          message: (
            <div className="flex w-full justify-between items-center gap-4">
              <div>
                Your organization has been{" "}
                <span className="text-green-600 font-medium">approved</span>.
                You can now create bootcamps and courses.
              </div>
              <div className="text-[14px] font-light leading-[22px] text-[#333333]">
                <p>{formatTimestamp(parseInt(notification.timestamp))}</p>
              </div>
            </div>
          ),
        };

      case "BOOTCAMP_REGISTRATION":
        return {
          icon: (
            <FaUserPlus className="h-[32px] w-[32px] flex-none text-[#A01B9B]" />
          ),
          message: (
            <div className="flex w-full justify-between items-center gap-4">
              <div>
                You have successfully registered for Bootcamp ID:{" "}
                <span className="text-[#A01B9B] underline">
                  {notification.bootcampId}
                </span>
                . You can now access the bootcamp and start learning.
              </div>
              <div className="text-[14px] font-light leading-[22px] text-[#333333]">
                <p>{formatTimestamp(parseInt(notification.timestamp))}</p>
              </div>
            </div>
          ),
        };

      case "INSTRUCTOR_ADDED":
        return {
          icon: (
            <FaUserPlus className="h-[32px] w-[32px] flex-none text-blue-600" />
          ),
          message: (
            <div className="flex w-full justify-between items-center gap-4">
              <div>
                You have been added as an instructor to{" "}
                <span className="text-blue-600 underline">
                  Web3 Afrika bootcamp
                </span>{" "}
                You can now manage and create course content.
              </div>
              <div className="text-[14px] font-light leading-[22px] text-[#333333]">
                <p>{formatTimestamp(parseInt(notification.timestamp))}</p>
              </div>
            </div>
          ),
        };

      case "INSTRUCTOR_REMOVED":
        return {
          icon: (
            <FaUserPlus className="h-[32px] w-[32px] flex-none text-red-600" />
          ),
          message: (
            <div className="flex w-full justify-between items-center gap-4">
              <div>
                You have been removed as an instructor from{" "}
                <span className="text-red-600 underline">
                  Web3 Afrika bootcamp
                </span>{" "}
                You no longer have access to manage this bootcamp.
              </div>
              <div className="text-[14px] font-light leading-[22px] text-[#333333]">
                <p>{formatTimestamp(parseInt(notification.timestamp))}</p>
              </div>
            </div>
          ),
        };

      default:
        return {
          icon: (
            <GiBookshelf className="h-[32px] w-[32px] flex-none text-[#A01B9B]" />
          ),
          message: (
            <>
              New notification from{" "}
              <span className="text-[#A01B9B] underline">
                Web3 Afrika bootcamp
              </span>
            </>
          ),
        };
    }
  };

  const { icon, message } = getNotificationContent();

  return (
    <div className="h-[100px] px-4 border-b-[1px] border-b-[#CACBCB] flex space-x-3 items-center w-full">
      {icon}
      <h1 className="text-[14px] font-light leading-[22px] text-[#333333] flex-1">
        {message}
      </h1>
    </div>
  );
};

export default Notifycard;
