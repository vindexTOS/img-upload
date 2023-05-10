import React from 'react'
import { UseImgContext } from '../context/context'
import { FaFileUpload, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import UrlCopyComonent from '../components/UrlCopyComonent'
import Info from '../components/Info'
const Home = () => {
  const {
    uploadFileToFirebaseStorage,
    imgUpload,
    htmlImg,
    imgUploadDrag,
    removeImgFromHtml,
    loading,
    error,
    imgData,
    setError,
  } = UseImgContext()

  const style = {
    main: `flex justify-center flex-col items-center   w-[100%] h-[100vh] gap-10`,
    form: `flex  items-center justify-center flex-col gap-10`,
    input: `hidden`,
    label: `w-[700px] h-[400px]   
      box  cursor-pointer outline outline-dotted outline-orange-500  flex items-center justify-center rounded-[12px]`,
    icon: `text-[5rem] text-yellow-500  absolute   `,
    btn: `w-[700px] text-white h-[4rem] absolute flex items-center justify-center  bg-orange-500 hover:bg-orange-400 rounded-[10px] bottom-[5%] cursor-pointer`,
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
    <main className={style.main}>
      <Info />
      <form
        className={style.form}
        onSubmit={(e) => uploadFileToFirebaseStorage(e)}
      >
        {/* <h1 onClick={() => console.log(imgData)}>Check data</h1> */}
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
          <div className="z-40 absolute    w-[700px] h-[400px] flex  pb-5 items-center justify-center rounded-[20px] ">
            {!loading && (
              <button
                className=" z-40 text-[4rem] absolute text-yellow-500 hover:text-red-600"
                onClick={(e) => removeImgFromHtml(e)}
              >
                <FaTrashAlt />
              </button>
            )}
            <img
              className="w-[50%] h-[50%] absolute rounded-[20px] "
              src={String(htmlImg)}
            />
          </div>
        )}

        {htmlImg && (
          <button className={style.btn} type="submit">
            UPLOAD
          </button>
        )}

        {error === 'Photo Has Been Uploaded' && (
          <h1 className={style.btn} onClick={() => setError('')}>
            <p className="text-[2rem] font-bold">UPLOAD MORE</p>
          </h1>
        )}
        {error === 'Photo Has Been Uploaded' && <UrlCopyComonent />}
        <p className="text-[1.2rem] text-green-600 font-bold">{error}</p>
      </form>
    </main>
  )
}

export default Home
