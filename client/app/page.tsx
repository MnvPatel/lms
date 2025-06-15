'use client'

import React, {FC, useState} from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";

interface Props{}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);

  return (
    <div className="min-h-screen">
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn."
        keywords="Programming, MERN, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <Hero />
      {/* Add some content to make the page scrollable
      <div className="mt-[100px] h-[2000px]">
        <h1 className="text-center text-3xl">Main Content Area</h1>
      </div> */}
    </div>
  )
}

export default Page;