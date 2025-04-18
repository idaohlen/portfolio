import { useRef, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import config from "@/config";

export default function App() {
  document.title = config.pageTitle;
  const location = useLocation();
  const pageContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (pageContainerRef.current) {
      // Set initial styles explicitly
      if (pageContainerRef.current) {
        pageContainerRef.current.style.opacity = "0";
        pageContainerRef.current.style.transform = "translateY(20px)";
      }

      // Slightly delay the animation to allow child components to initialize
      setTimeout(() => {
        anime({
          targets: pageContainerRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: "easeOutQuad",
        });
      }, 10);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div mode="wait" ref={pageContainerRef} style={{ opacity: 0 }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
