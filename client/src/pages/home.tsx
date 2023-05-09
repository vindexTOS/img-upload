import React from 'react'
import { UseImgContext } from '../context/context'

const Home = () => {
  const { uploadFileToFirebaseStorage, imgUpload } = UseImgContext()

  return (
    <form onSubmit={(e) => uploadFileToFirebaseStorage(e)}>
      <input onChange={(e) => imgUpload(e)} type="file" />
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default Home
