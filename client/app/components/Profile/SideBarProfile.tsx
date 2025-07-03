// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */
import React from "react";
// import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: React.FC<Props> = ({
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});

  return (
    <div className="w-full">
      {/* My Account */}
      <div
        className={`w-full flex items-center justify-start px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={userData?.user?.avatar?.url || avatar || "/assets/avatar.png"}
          alt="avatar"
          width={25}
          height={25}
          className="w-[25px] h-[25px] rounded-full cursor-pointer"
        />

        <h5 className="pl-2 block font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center justify-start px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center justify-start px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>

      {/* Log Out */}
      <div
        className="w-full flex items-center justify-start px-3 py-4 cursor-pointer hover:dark:bg-slate-800 hover:bg-gray-100"
        onClick={logOutHandler}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 block font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
