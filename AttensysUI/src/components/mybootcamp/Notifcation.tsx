import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import Notifycard from "./Notifycard";
import { gql, request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDropdown } from "react-icons/io"; // Add this import at the top

const orgquery = gql`
  {
    organizationProfiles {
      org_name
      block_number
      block_timestamp
    }
    bootCampCreateds {
      bootcamp_name
      org_name
      block_number
      block_timestamp
    }
    bootcampRegistrations {
      bootcamp_id
      org_address
      block_number
      block_timestamp
    }
    instructorAddedToOrgs {
      instructors
      org_name
      block_number
      block_timestamp
    }
    instructorRemovedFromOrgs {
      instructor_addr
      org_owner
      block_number
      block_timestamp
    }
    registrationApproveds {
      bootcamp_id
      student_address
      block_number
      block_timestamp
    }
    registrationDeclineds {
      bootcamp_id
      student_address
      block_number
      block_timestamp
    }
  }
`;

interface EventData {
  organizations: {
    bootcampRegistrations?: any[];
    instructorAddedToOrgs?: any[];
    instructorRemovedFromOrgs?: any[];
    registrationApproveds?: any[];
    organizationProfiles?: any[];
    organizationDeclineds?: any[];
    bootCampCreateds?: any[];
  };
}

const orgurl =
  "https://api.studio.thegraph.com/query/107628/orgsubgraph/version/latest";
const headers = { Authorization: "Bearer {api-key}" };

const Notifcation = (props: any) => {
  const { wallet } = props;
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(true); // Add this state

  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(orgurl, orgquery, {}, headers);
    },
    refetchInterval: 10000,
  });

  const eventData: EventData = React.useMemo(
    () => ({
      organizations: data ?? {},
    }),
    [data],
  );

  React.useEffect(() => {
    // Add this function after the queries and before the return statement
    const filterNotificationsByAddress = (address: string) => {
      if (!address) return [];

      const notifications: any = [];
      console.log(eventData.organizations);

      if (Object.keys(eventData.organizations).length != 0) {
        // Check bootcamp created
        // eventData.organizations?.bootCampCreateds?.forEach((event: any) => {
        //   if (
        //     formatAddress(event.org_address.toLowerCase()) ===
        //     address.toLowerCase()
        //   ) {
        //     notifications.push({
        //       type: "BOOTCAMP_CREATED",
        //       bootcampId: event.bootcamp_id,
        //       timestamp: event.block_timestamp,
        //       blockNumber: event.block_number,
        //     });
        //   }
        // });
        // Check bootcamp registrations
        eventData.organizations?.bootcampRegistrations?.forEach(
          (event: any) => {
            if (
              formatAddress(event.org_address.toLowerCase()) ===
              address.toLowerCase()
            ) {
              notifications.push({
                type: "BOOTCAMP_REGISTRATION",
                bootcampId: event.bootcamp_id,
                timestamp: event.block_timestamp,
                blockNumber: event.block_number,
              });
            }
          },
        );
        // Check instructor additions
        eventData.organizations?.instructorAddedToOrgs?.forEach(
          (event: any) => {
            for (let i = 0; i < event.instructors.length; i++) {
              if (
                formatAddress(event.instructors[i].toLowerCase()) ===
                address.toLowerCase()
              ) {
                notifications.push({
                  type: "INSTRUCTOR_ADDED",
                  orgName: event.org_name,
                  timestamp: event.block_timestamp,
                  blockNumber: event.block_number,
                });
              }
            }
          },
        );
        // // Check instructor removed
        // eventData.organizations?.instructorRemovedFromOrgs?.forEach(
        //   (event: any) => {
        //     if (
        //       formatAddress(event.org_address.toLowerCase()) ===
        //       address.toLowerCase()
        //     ) {
        //       notifications.push({
        //         type: "INSTRUCTOR_REMOVED",
        //         bootcampId: event.bootcamp_id,
        //         timestamp: event.block_timestamp,
        //         blockNumber: event.block_number,
        //       });
        //     }
        //   },
        // );
        // // Check organization profile created
        // eventData.organizations?.organizationProfiles?.forEach((event: any) => {
        //   if (
        //     formatAddress(event.org_address.toLowerCase()) ===
        //     address.toLowerCase()
        //   ) {
        //     notifications.push({
        //       type: "ORGANIZATION_PROFILE_CREATED",
        //       bootcampId: event.bootcamp_id,
        //       timestamp: event.block_timestamp,
        //       blockNumber: event.block_number,
        //     });
        //   }
        // });
        // Check organization approved
        eventData.organizations?.registrationApproveds?.forEach(
          (event: any) => {
            if (
              formatAddress(event.student_address.toLowerCase()) ===
              address.toLowerCase()
            ) {
              notifications.push({
                type: "ORGANIZATION_APPROVED",
                bootcampId: event.bootcamp_id,
                timestamp: event.block_timestamp,
                blockNumber: event.block_number,
              });
            }
          },
        );
        // Check organization declined
        eventData.organizations?.organizationDeclineds?.forEach(
          (event: any) => {
            if (
              formatAddress(event.student_address.toLowerCase()) ===
              address.toLowerCase()
            ) {
              notifications.push({
                type: "ORGANIZATION_DECLINED",
                bootcampId: event.bootcamp_id,
                timestamp: event.block_timestamp,
                blockNumber: event.block_number,
              });
            }
          },
        );
      }

      // Sort notifications by timestamp (most recent first)
      return notifications.sort((a: any, b: any) => b.timestamp - a.timestamp);
    };

    setNotifications(filterNotificationsByAddress(wallet?.selectedAddress));
  }, [data]);

  // Add this helper function
  const formatAddress = (addr: string) => {
    if (addr.startsWith("0x")) {
      return addr.startsWith("0x0") ? addr : "0x0" + addr.slice(2);
    }
    return "0x0" + addr;
  };

  console.log("what is notifications", notifications);

  return (
    <div className="mt-4 w-[90%] sm:w-[80%] mx-auto h-auto rounded-xl bg-[#FFFFFF] border-[1px] border-[#D9D9D9] py-3">
      <div
        className="h-[60px] sm:h-[80px] w-full border-b-[1px] border-b-[#D9D9D9] flex justify-between px-4 sm:px-8 items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex space-x-3 items-center justify-center">
          <IoMdNotificationsOutline className="h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] text-[#5801A9]" />
          <h1 className="font-medium text-sm sm:text-[20px] text-[#333333]">
            Notifications ({notifications.length})
          </h1>
        </div>

        <div className="flex space-x-2 items-center justify-center">
          <h1 className="font-medium text-[12px] text-[#5801A9] underline">
            <span className="hidden sm:flex">See all notifications</span>
            <span className="flex sm:hidden">See all</span>
          </h1>
          <IoIosArrowDropdown
            className={`h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] text-[#333333] transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-[90%] sm:w-[80%] h-auto mt-3 mx-auto">
          {notifications.map((notification, index) => (
            <Notifycard key={index} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifcation;
