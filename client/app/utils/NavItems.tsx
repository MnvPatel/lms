import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex items-center">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400] hover:text-[crimson] dark:hover:text-[#37a39a] transition duration-200`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>

      {isMobile && (
        <div className="md:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span className="{`text-[25px] font-Poppins font-[500] text-black dark:text-white`}">
                ELearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href="/" key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
