import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ContextImgProvider } from './context/context.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextImgProvider>
      <App />
    </ContextImgProvider>
  </React.StrictMode>,
)
