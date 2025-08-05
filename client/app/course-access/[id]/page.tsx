/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import CourseContent from '@/app/components/Course/CourseContent';
import { Loader } from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
    params: any;
}

const page = ({params}: Props) => {
    const id = params.id;

    const {isLoading, error, data} = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if(data){
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if(!isPurchased){
                redirect("/");
            }
            if(error){
                redirect("/");
            }
        }
    },[data, error, id])
  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : (
            <div>
                <CourseContent id={id} user={data.user}/>
            </div>
        )
    }
    </>
  )
}

export default page

// 'use client'

// import CourseContent from '@/app/components/Course/CourseContent';
// import { Loader } from '@/app/components/Loader/Loader';
// import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
// import React from 'react';

// const Page = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
//   const params = React.use(paramsPromise); // ✅ Unwrap the params
//   const { isLoading, data } = useLoadUserQuery(undefined, {});

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <CourseContent id={params.id} user={data.user} />
//         </div>
//       )}
//     </>
//   );
// };

// export default Page;
