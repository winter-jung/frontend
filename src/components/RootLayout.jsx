import { Outlet } from "react-router";
import Navi from "./Navi";
function RootLayout() {
    return (
        <>
            <div>RootLayout</div>
            <Navi />
            <Outlet />
        </>
    )
}

export default RootLayout;