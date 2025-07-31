/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#000]">
      <div className="border border-[#00000000] dark:border-[#ffffff1a]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/channel/UCHz6Sne9sp1mvm-q2w1_HWQ"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/shahriar_sajeeb_/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/shahriarsajeeb"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Contact Info
            </h3>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Call Us: 1-885-665-2022
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Address: 7011 Vermont Ave, Los Angeles, CA 90044
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Mail Us: hello@elearning.com
            </p>
          </div>

          <br />

        </div>
          <p className="text-center text-black dark:text-white justify-center">
            Copyright © {new Date().getFullYear()} Elearning | All Rights
            Reserved
          </p>
      </div>
        <br />
    </footer>
  );
};

export default Footer;
