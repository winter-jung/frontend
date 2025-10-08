import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <Navi />
      <div className="pt-5">
          <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
