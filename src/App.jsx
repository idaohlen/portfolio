import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import config from '@/config'

export default function App() {
  document.title = config.pageTitle
  const location = useLocation()

  const handleExitComplete = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Header />
      <AnimatePresence mode='wait' onExitComplete={handleExitComplete}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}