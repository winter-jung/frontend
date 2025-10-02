import { Outlet } from "react-router";
import Navi from "./Navi";
function RootLayout() {
    return (
        <>
            <Navi  />
            <Outlet />
        </>
    )
}

export default RootLayout;