/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTheme } from "next-themes";

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-50">
      <ThemeSwitcher />

      {/* Notification Icon */}
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline
          className="text-2xl cursor-pointer transition-colors duration-300"
          color={theme === "dark" ? "#ffffff" : "#000000"}
        />
        <span className="absolute -top-2 -right-2 bg-[#3ccba8] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[26px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>

          {/* Notification 1 */}
          <div className="dark:bg-[#263a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Deserunt, sequi! Tempora libero omnis et, ea beatae ut, itaque
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              5 days ago
            </p>
          </div>

          {/* Notification 2 */}
          <div className="dark:bg-[#263a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Deserunt, sequi! Tempora libero omnis et, ea beatae ut, itaque
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
