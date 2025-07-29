/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import AllInvoices from '@/app/components/Admin/Order/AllInvoices'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '@/app/utils/Heading'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <Heading
                title="Elearning - Admin"
                description="Elearning is a platform for students to learn and get help from teachers"
                keywords="Programming,MERN,Redux,Machine Learning"
            />
            <div className="flex h-screen">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <AllInvoices  />
                </div>
            </div>
        </div>
    )
}

export default Page