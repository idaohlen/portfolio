import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from './pages/Projects'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import config from '@/config'

export default function App() {
  document.title = config.pageTitle

  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  )
}