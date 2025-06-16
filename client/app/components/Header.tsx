import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: string;
  route: string;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if ((e.target as HTMLDivElement).id === "screen") {
    setOpenSidebar(false);
  }
};

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-white text-black dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "bg-white text-black dark:bg-gray-900 dark:text-white w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] fixed top-0 left-0 shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile devices */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="hidden md:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* mobile sidebar  */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br/>
              <br/>
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2025 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
      {
        route === "Login" && (
            <>
              {
                open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Login}
                  />
                )
              }
            </>
        )
      }
      {
        route === "Sign-Up" && (
            <>
              {
                open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={SignUp}
                  />
                )
              }
            </>
        )
      }
      {
        route === "Verification" && (
            <>
              {
                open && (
                  <CustomModal
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Verification}
                  />
                )
              }
            </>
        )
      }
    </div>
  );
};

export default Header;
