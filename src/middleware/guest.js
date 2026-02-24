import { redirect } from "react-router-dom";

// Middleware untuk halaman yang hanya bisa diakses oleh user yang belum login
export default function guest() {
    const access_token = localStorage.getItem("access_token");

    // Jika sudah ada token (sudah login), redirect ke home
    if (access_token) {
        return redirect("/cart");
    }
    // Kalau belum login, boleh akses halaman
    return null;
}
