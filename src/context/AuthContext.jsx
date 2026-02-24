import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    // Kalo access_token ada di localstorage, maka isLogin = NULL
    const [isLogin, setIsLogin] = useState(localStorage.getItem("access_token"));

    function checkLogin() {
        if (localStorage.getItem("access_token")) {
            setIsLogin(localStorage.getItem("access_token"));
        }
    }

    function logout() {
        setIsLogin(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    return (
        // Value : export state dan function yang mau dibagi ke component lain
        <AuthContext.Provider value={{ isLogin, checkLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}