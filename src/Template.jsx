import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";

export default function Template() {
    return (
        <>
            <NavbarComp/>
            {/* Menyediakan tempat dinamis, yang akan berubah berubah == @yield */}
            <Outlet/> 
            {/* Direact Outlet = @yield di blade template */}
        </>
    )
}