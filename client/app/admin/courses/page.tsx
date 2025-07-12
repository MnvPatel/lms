/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import AdminSideBar from '../../components/Admin/sidebar/AdminSidebar'
import React from 'react'
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AllCourses from '@/app/components/Admin/Course/AllCourses';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, ML"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]">
            <DashboardHero/>
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
}

export default page