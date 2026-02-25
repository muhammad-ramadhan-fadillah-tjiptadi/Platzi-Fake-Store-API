import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";

export default function Template() {
    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <NavbarComp />
                    {/* Menyediakan tempat dinamis, yang akan berubah berubah == @yield */}
                    <Outlet />
                    {/* Direact Outlet = @yield di blade template */}
                </CartProvider>
            </AuthProvider>
        </>
    )
}