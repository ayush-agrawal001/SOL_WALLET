import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MnemoProvider } from './context/keypair_mnemo.tsx'
import { AnimatePresence } from 'framer-motion'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimatePresence >
      <MnemoProvider>  
        <App />
      </MnemoProvider>    
    </AnimatePresence>
  </StrictMode>,
)
