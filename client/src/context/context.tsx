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
}

export const ContextImg = createContext<Cell | null>(null)

export const ContextImgProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [image, setImage] = useState<any>()
  const [url, setUrl] = useState<string>()
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newImg = image

    if (e.target.files) {
      newImg = e.target.files[0]

      setImage(newImg)
    }
  }

  const uploadFileToFirebaseStorage = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    const storageRef = ref(storage, 'imgs/' + image.name)
    try {
      const snapshot = await uploadBytesResumable(storageRef, image)
      const downloadURL = await getDownloadURL(snapshot.ref)
      setUrl(downloadURL)
      console.log('succsess')
    } catch (error) {
      console.log(error)
      console.log('ერრორ')
    }
  }
  const serverUrl = 'http://localhost:3000/api/v1/img'
  const UploadImgToDataBase = async () => {
    if (url) {
      await axios.post(serverUrl, { img: url })
    }
  }

  React.useEffect(() => {
    if (url) {
      UploadImgToDataBase()
    }
  }, [url])
  return (
    <ContextImg.Provider value={{ imgUpload, uploadFileToFirebaseStorage }}>
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
