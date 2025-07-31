/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Trott",
    avatar: "https://randomuser.me/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "The layout now matches photo 1 while preserving your existing course card component. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde voluptatum dignissimos, nulla perferendis dolorem voluptate memo possimus magni deleniti natus accusamus officiis quasi nihil commodi, praesentium quidem, quis doloribus",
  },
  {
    name: "Trott",
    avatar: "https://randomuser.me/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "The layout now matches photo 1 while preserving your existing course card component.",
  },
  {
    name: "Trott",
    avatar: "https://randomuser.me/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "The layout now matches photo 1 while preserving your existing course card component.",
  },
  {
    name: "Trott",
    avatar: "https://randomuser.me/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "The layout now matches photo 1 while preserving your existing course card component. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde voluptatum dignissimos, nulla perferendis dolorem voluptate memo possimus magni deleniti natus accusamus officiis quasi nihil commodi, praesentium quidem, quis doloribus",
  },
];
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/banner-img-1.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate memo
            possimus magni deleniti natus accusamus officiis quasi nihil
            commodi, praesentium quidem, quis doloribus?
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] md-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
