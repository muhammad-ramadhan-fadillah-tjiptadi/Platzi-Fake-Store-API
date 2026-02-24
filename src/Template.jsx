import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import AuthProvider from "./context/AuthContext";

export default function Template() {
    return (
        <>
            <AuthProvider>
                <NavbarComp />
                {/* Menyediakan tempat dinamis, yang akan berubah berubah == @yield */}
                <Outlet />
                {/* Direact Outlet = @yield di blade template */}
            </AuthProvider>
        </>
    )
}