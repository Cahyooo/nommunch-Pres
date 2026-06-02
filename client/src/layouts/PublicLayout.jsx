import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function PublicLayout() {
  return (
    <div className="font-unbounded custom-cursor public-scrollbar text-gray-800 bg-soft">
        <Navbar />

        <Outlet />

        <Footer />
    </div>
  );
}