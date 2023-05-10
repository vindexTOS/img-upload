import React from 'react'
import { UseImgContext } from '../context/context'
import { AiOutlineCopy } from 'react-icons/ai'

const Gallary = () => {
  const { imgData } = UseImgContext()
  return (
    <section className="w-[100%] flex flex-col items-center justify-center ">
      <div className="flex w-[100%] h-[100vh] justify-center flex-wrap gap-5 p-20  ">
        {imgData?.map((val: any) => {
          const [copy, setCopy] = React.useState<string>('')
          function copyToClipboard() {
            navigator.clipboard
              .writeText(val.img)
              .then(() => setCopy('Copied!'))
              .catch((error) =>
                console.error('Error copying text to clipboard:', error),
              )
            setTimeout(() => {
              setCopy('')
            }, 2000)
          }
          return (
            <div key={val._id} className="relative flex justify-end">
              <img
                className="rounded-[20px] max-w-[500px] h-[400px] outline outline-1"
                src={val.img}
              />
              <div
                onClick={() => copyToClipboard()}
                className="absolute  top-[22rem]  outline-1 p-1 rounded-[50%] outline-gray-700 outline ml-5 cursor-pointer text-yellow-300 hover:text-green-500 hover:bg-gray-300 hover:outline-none  mx-5"
              >
                <AiOutlineCopy className=" text-[2rem]" />
              </div>
              {copy && (
                <p className="text-white bg-green-400 w-[5rem] h-[2rem] absolute left-2 top-[22rem] rounded-[20px] flex items-center justify-center font-bold">
                  {copy}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Gallary
