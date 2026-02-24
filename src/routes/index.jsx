import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Products from "../pages/Products.jsx";
import Template from "../Template.jsx";
import User from "../pages/User.jsx";
import CategoryProducts from "../pages/CategoryProducts.jsx";
import Login from "../pages/Login.jsx";
import Cart from "../pages/Cart.jsx";
import auth from "../middleware/auth.js";
import guest from "../middleware/guest.js";

// Variabel yang menyimpan daftar routing, di export biar bisa dipake di file lain
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // Mengisi ke outlet di template.jsx
        children: [
            {
                path: "/", // Url Path
                element: <App />, // File yang akan ditampilkan
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/dashboard",
                element: <User />,
            },
            {
                // Path dinamis (:)
                path: "/products/category/:categoryId",
                element: <CategoryProducts />,
            },
            {
                path: "/login",
                element: <Login />,
                loader: guest
            },
        ],
    },
    {
        path: "/",
        element: <Template />,
        // Memanggil middleware sebelum menjalankan path didalam sini
        loader: auth,
        children: [
            {
                path: "/cart",
                element: <Cart />
            }
        ]
    }
]);
