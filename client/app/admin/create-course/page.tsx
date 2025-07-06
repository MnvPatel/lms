/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Sidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '../../../app/utils/Heading'
import React from 'react'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'


type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn."
        keywords="Programming, MERN, Redux"
      />
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
            <Sidebar/>
        </div>
        <div className='w-[85%]'>
            <DashboardHeader/>
            <CreateCourse />
        </div>
      </div>
    </div>
  )
}

export default page