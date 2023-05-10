import React, { createContext, useContext, useState } from 'react'
import { storage } from '../firebase/firebase.ts'
import axios from 'axios'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from 'firebase/storage'

export interface Cell {
  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadFileToFirebaseStorage: (e: React.FormEvent<HTMLFormElement>) => void
  htmlImg: String | null
  imgUploadDrag: (e: React.DragEvent<HTMLLabelElement>) => void
  removeImgFromHtml: () => void
  loading: boolean
  error: string
  imgUrl: string
  imgData: any
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const ContextImg = createContext<Cell | null>(null)

export const ContextImgProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [image, setImage] = useState<any>(null)
  const [htmlImg, setHtmlImg] = useState<String | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }
  const imgUploadDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }

  const uploadFileToFirebaseStorage = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    if (image) {
      const storageRef = ref(storage, 'imgs/' + image.name)
      setLoading(true)
      setError('')
      try {
        const snapshot = await uploadBytesResumable(storageRef, image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        setImgUrl(downloadURL)
        setLoading(false)
        console.log('succsess')
        removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    } else {
      setError('Please Select The File!')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }
  const serverUrl = 'http://localhost:3000/api/v1/img'

  const UploadImgToDataBase = async () => {
    if (imgUrl) {
      await axios.post(serverUrl, { img: imgUrl })
    }
  }

  const returnURL = async () => {
    await UploadImgToDataBase()
    setError('Photo Has Been Uploaded')
  }

  React.useEffect(() => {
    if (imgUrl) {
      returnURL()
    }
  }, [imgUrl])
  /// resiving data
  const [imgData, setImgData] = useState<any>([])
  React.useEffect(() => {
    axios
      .get(serverUrl)
      .then((res) => setImgData(res.data.data))
      .catch((err) => console.log(err))
  }, [error])
  return (
    <ContextImg.Provider
      value={{
        imgUpload,
        uploadFileToFirebaseStorage,
        htmlImg,
        imgUploadDrag,
        removeImgFromHtml,
        loading,
        error,
        imgUrl,
        imgData,
        setError,
      }}
    >
      {children}
    </ContextImg.Provider>
  )
}

export const UseImgContext = () => {
  const context = useContext(ContextImg)
  if (!context) {
    throw new Error('ITs not wrapped etc')
  }
  return context
}
function UploadImgToDataBase() {
  throw new Error('Function not implemented.')
}
