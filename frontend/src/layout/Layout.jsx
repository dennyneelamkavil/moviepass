import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ScrollToTop from "../component/ScrollToTop";
import FloatingButton from "../component/FloatingButton";

function Layout() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default Layout;
