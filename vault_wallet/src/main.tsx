import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MnemoProvider } from './context/keypair_mnemo.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MnemoProvider>  
        <App />
      </MnemoProvider>    
  </StrictMode>,
)
