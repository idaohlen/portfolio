import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <>
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column",
            position: "relative",
            willChange: "transform, opacity"
          }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
