import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
const Info = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[2.5rem] font-bold text-orange-600">
        Uploade Image Here
      </h1>
      <AiOutlineArrowDown className="text-[3rem] text-green-500 " />
    </div>
  )
}

export default Info
