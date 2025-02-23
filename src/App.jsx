import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Header from '@/components/Header'

import config from '@/config'

export default function App() {
  document.title = config.pageTitle

  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}