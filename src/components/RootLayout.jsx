import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "./Footer";

function RootLayout() {
    return (
        <>
            <Navi  />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout;