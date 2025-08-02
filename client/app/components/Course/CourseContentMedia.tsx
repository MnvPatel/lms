import React, { FC } from 'react'

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo : number) => void;
}

const CourseContentMedia = ({data, id, activeVideo, setActiveVideo}: Props) => {
  return (
    <div>CourseContentMedia</div>
  )
}

export default CourseContentMedia