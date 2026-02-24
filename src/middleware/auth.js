import { redirect } from "react-router-dom";

export default function auth() {
    const access_token = localStorage.getItem("access_token");

    // Cek jika di localstorage ada access_token maka halaman ga boleh diakses
    if (!access_token) {
        // Perpindahan halaman :
        // 1. Navigate : jika func dipanggil lewat event (onchange, dsb)
        // 2. Redirect : jika func dipanggil dari on
        return redirect("/login");
    }
    // Kalau ga ada localstorage boleh diakses
    return null;
}