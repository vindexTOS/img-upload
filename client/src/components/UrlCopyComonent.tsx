import React from 'react'
import { UseImgContext } from '../context/context'
import { AiOutlineCopy } from 'react-icons/ai'
const UrlCopyComonent = () => {
  const { imgUrl } = UseImgContext()
  const style = {
    mainDiv: ` gap-2 bg-gray-300 w-[720px] mb-20 h-[450px] outline-[1px] outline p-2 rounded-[20px] absolute  flex flex-col items-center justify-center  `,
  }

  const [copy, setCopy] = React.useState<string>('')
  function copyToClipboard() {
    navigator.clipboard
      .writeText(imgUrl)
      .then(() => setCopy('Copied!'))
      .catch((error) =>
        console.error('Error copying text to clipboard:', error),
      )
    setTimeout(() => {
      setCopy('')
    }, 2000)
  }
  return (
    <div className={style.mainDiv}>
      <h1 className="text-green-500 text-[2rem]">
        Your image has been uploaded
      </h1>
      <img className="w-[200px] h-[200px]" src={imgUrl} />

      <h1
        className="font-bold text-orange-500 flex items-center jusfity-center gap-2 cursor-pointer hover:text-orange-300"
        onClick={() => copyToClipboard()}
      >
        Copy Your Image Url{' '}
        <AiOutlineCopy className="text-[1.5rem] text-blue-400 " />
      </h1>
      <p className="text-center w-[700px]">{imgUrl}</p>
      {copy && (
        <p className="text-white bg-green-400 w-[5rem] h-[2rem] absolute  rounded-[20px] flex items-center justify-center font-bold">
          {copy}
        </p>
      )}
    </div>
  )
}

export default UrlCopyComonent
