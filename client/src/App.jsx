import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import ScrollToTop from "./ScrollToTop";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Product from "./pages/Product/Product";
import Contact from "./pages/Contact/Contact";
import Feedback from "./pages/Feedback/Feedback";
import Admin from "./pages/Admin/Admin";

import { lenis } from "./lenis";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
