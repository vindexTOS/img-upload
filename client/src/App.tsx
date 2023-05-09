import { useState } from 'react'
import axios from 'axios'
import Home from './pages/home'
function App() {
  const [text, setText] = useState()

  const url = 'http://localhost:3000/api/v1/img'
  const postData = async () => {
    axios.post(url, { img: text })
  }

  return (
    <div>
      <Home />
    </div>
  )
}

export default App
