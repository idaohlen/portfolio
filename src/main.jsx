import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'
import './index.css'
import App from './App.jsx'

import ScrollToTop from '@/components/ScrollToTop'

const style = {
  height: '100%',
  flex: '1 1',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider style={style} className='flex flex-col justify-between'>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
)