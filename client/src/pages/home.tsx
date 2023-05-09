import React from 'react'
import { UseImgContext } from '../context/context'
import { FaFileUpload, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import UrlCopyComonent from '../components/UrlCopyComonent'
const Home = () => {
  const {
    uploadFileToFirebaseStorage,
    imgUpload,
    htmlImg,
    imgUploadDrag,
    removeImgFromHtml,
    loading,
    error,
  } = UseImgContext()

  const style = {
    form: `flex  items-center justify-center w-[100%] h-[100vh] flex-col gap-10`,
    input: `hidden`,
    label: `w-[700px] h-[400px]   
      box  cursor-pointer outline outline-dotted outline-orange-500  flex items-center justify-center rounded-[60px]`,
    icon: `text-[5rem] text-yellow-500  absolute   `,
    btn: `w-[20rem] text-white h-[4rem] absolute bg-blue-400 hover:bg-blue-300 rounded-[40px] bottom-40 `,
  }
  const [hover, setHover] = React.useState<boolean>(false)
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setHover(true)
  }
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setHover(false)
  }
  return (
    <form
      className={style.form}
      onSubmit={(e) => uploadFileToFirebaseStorage(e)}
    >
      <label
        style={{ backgroundColor: hover && '#90EE90' }}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => imgUploadDrag(e)}
        className={style.label}
        htmlFor="img"
      >
        <input
          className={style.input}
          id="img"
          onChange={(e) => imgUpload(e)}
          type="file"
        />
        {loading ? (
          <AiOutlineLoading3Quarters className="rotate z-50 text-[5rem] absolute  text-orange-500 " />
        ) : (
          <>{!htmlImg && <FaFileUpload className={style.icon} />}</>
        )}
      </label>
      {htmlImg && (
        <div className="z-40 absolute bottom-[29%] w-[700px] h-[400px] flex  items-center justify-center rounded-[20px] ">
          {!loading && (
            <button
              className=" z-40 text-[4rem] absolute text-yellow-500 hover:text-red-600"
              onClick={(e) => removeImgFromHtml(e)}
            >
              <FaTrashAlt />
            </button>
          )}
          <img
            className="w-[90%] h-[90%] rounded-[20px] "
            src={String(htmlImg)}
          />
        </div>
      )}

      {htmlImg && (
        <button className={style.btn} type="submit">
          UPLOAD
        </button>
      )}
      {error === 'Photo Has Been Uploaded' && <UrlCopyComonent />}
      <p>{error}</p>
    </form>
  )
}

export default Home
