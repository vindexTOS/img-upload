import React from 'react'
import { UseImgContext } from '../context/context'

const UrlCopyComonent = () => {
  const { imgUrl } = UseImgContext()
  const style = {
    mainDiv: ``,
  }
  return <div className={style.main}>{imgUrl}</div>
}

export default UrlCopyComonent
