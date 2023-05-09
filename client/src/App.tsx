import { useState } from 'react'
import axios from 'axios'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
function App() {
  const [text, setText] = useState()

  const url = 'http://localhost:3000/api/v1/img'
  const postData = async () => {
    axios.post(url, { img: text })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
