/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'

import React, {FC, useState} from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props{}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div className="bg-white dark:bg-slate-900">
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn."
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      {/* Add some content to make the page scrollable
      <div className="mt-[100px] h-[2000px]">
        <h1 className="text-center text-3xl">Main Content Area</h1>
      </div> */}
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Page;