/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Loader } from '../Loader/Loader'
import { useRouter } from 'next/navigation'

type Props = {}

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner",{});
  const [search, setSearch] = useState();
  const router = useRouter();

  const handleSearch = () => {
    if(search === ""){
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  }
  return (
    <>
    {
      isLoading ? (
        <Loader />
      ) : (
        <div className='w-full min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Hero Animation Background Circle */}
      <div className='absolute top-[100px] 1000px:top-[50%] 1000px:left-[10%] 1000px:-translate-y-1/2 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-full'></div>
      
      <div className='max-w-7xl mx-auto px-4 py-8 w-full flex flex-col 1000px:flex-row items-center justify-between relative z-10'>
        
        {/* Left side - Image section */}
        <div className='1000px:w-[40%] flex items-center justify-center 1000px:justify-end order-1 1000px:order-1 relative'>
          <div className='relative w-full max-w-md 1000px:max-w-lg'>
            <Image 
              src={data?.layout?.banner?.image?.url} 
              alt='Learning illustration' 
              width={500}
              height={500}
              className='object-contain w-full h-auto' 
            />
          </div>
        </div>
        
        {/* Right side - Text content */}
        <div className='1000px:w-[60%] flex flex-col items-center 1000px:items-start text-center 1000px:text-left mt-8 1000px:mt-0 order-2 1000px:order-2'>
          <h1 className='text-[#000000c7] dark:text-white text-[30px] 1000px:text-[50px] 1100px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin leading-tight 1000px:leading-[75px] mb-6'>
            {data?.layout?.banner.title}
          </h1>
          
          <p className='text-[#000000ac] dark:text-[#edfff4] font-Josefin font-[600] text-[16px] 1000px:text-[18px] max-w-xl 1000px:max-w-none mb-8'>
            {data?.layout?.banner.subTitle}
          </p>
          
          {/* Search section */}
          <div className='w-full max-w-lg 1100px:max-w-xl 1500px:max-w-2xl h-[50px] bg-transparent relative mb-8'>
            <input 
              type='search' 
              placeholder='Search Courses...' 
              value={search}
              onChange={(e : any) => setSearch(e.target.value)}
              className='bg-white dark:bg-[#575757] border border-gray-300 dark:border-none text-[#0000004e] dark:text-[#ffffffe6] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[18px] 1000px:text-[20px] font-[500] font-Josefin focus:border-blue-400 dark:focus:ring-2 dark:focus:ring-blue-500'
            />
            <button className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] hover:bg-[#2ba5d4] rounded-r-[5px] transition-colors' onClick={handleSearch}>
              <BiSearch className='text-white' size={30} />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className='flex items-center justify-center 1000px:justify-start gap-4'>
            <div className='flex -space-x-2'>
              <Image src="/assets/client-1.jpg" alt='' width={40} height={40} className='rounded-full border-2 border-white'/>
              <Image src="/assets/client-2.jpg" alt='' width={40} height={40} className='rounded-full border-2 border-white'/>
              <Image src="/assets/client-3.jpg" alt='' width={40} height={40} className='rounded-full border-2 border-white'/>
            </div>
            <p className='font-Josefin text-[#000000ac] dark:text-[#edfff4] text-[16px] 1000px:text-[18px] font-[600]'>
              <span className='text-[#000000c7] dark:text-white font-bold'>500K+</span> People already trust us!{" "}
              <Link href="/courses" className='text-[crimson] dark:text-[#46e256] hover:underline transition-colors'>
                View Courses
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
      )
    }
    </>
  )
}

export default Hero