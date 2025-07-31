/* eslint-disable @typescript-eslint/no-explicit-any */
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { BiTime } from "react-icons/bi";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
      className="group block"
    >
      <div className="w-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-slate-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={item.thumbnail.url}
              fill
              alt={item.name}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {item.price === 0 ? "Free" : `$${item.price}`}
            </div>
          </div>

          {/* Difficulty/Level Badge (if available) */}
          {item.level && (
            <div className="absolute top-3 left-3">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
                {item.level}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {item.name}
          </h3>

          {/* Instructor (if available) */}
          {item.instructor && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {item.instructor}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center justify-between">
            <Ratings rating={item.ratings} />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({item.reviews || 0} reviews)
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <HiOutlineUsers className="w-4 h-4" />
              <span className={isProfile ? "hidden 800px:inline" : ""}>
                {item.purchased?.toLocaleString() || 0} students
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <AiOutlineUnorderedList className="w-4 h-4" />
              <span>{item.courseData?.length || 0} lectures</span>
            </div>
          </div>

          {/* Duration (if available) */}
          {item.duration && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <BiTime className="w-4 h-4" />
              <span>{item.duration}</span>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
            <div className="space-y-1">
              {item.estimatedPrice && item.price !== item.estimatedPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {item.price === 0 ? "Free" : `$${item.price}`}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${item.estimatedPrice}
                  </span>
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                    {Math.round(((item.estimatedPrice - item.price) / item.estimatedPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Favorite/Bookmark Button (optional) */}
            {/* <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                // Add favorite functionality here
              }}
            >
              <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button> */}
          </div>

          {/* Tags/Categories (if available) */}
          {/* {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.tags.slice(0, 3).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;