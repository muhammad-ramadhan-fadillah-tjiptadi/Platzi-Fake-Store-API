import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    function updateCart(item, qty) {
        // Cek jika di cart sudah ada produk tersebut, jangan ditambahkan tapi update qty nya aja
        let product = cart.find((data) => data.id == item.id);
        if (product) {
            setCart((prev) => {
                // Loop nilai cart sebelumnya, untuk menjadi produk yang dimaksud
                return prev.map((data) => {
                    if (data.id == item.id) {
                        // Update bagian qty dari data ditambahkan 1
                        return { ...data, qty: data.qty + 1 };
                    }
                    return data;
                });
            })
        } else {
            // Jika produk yang akan dimasukan ke keranjang belum ada di state cart, bikin baru 
            let newProduct = {
                id: item.id,
                title: item.title,
                image: item.images[0],
                price: item.price,
                qty: qty
            }
            setCart([...cart, newProduct]);
        }
    }

    function updateQtyProduct(id, type) {
        setCart((prev) => {
            return prev.map((item) => {
                // Cari yang id itemnya sesuai yang mau diupdate
                if (item.id == id) {
                    if (type === "+") {
                        return { ...item, qty: item.qty + 1 };
                    } else {
                        // Jika pengurangan, pastikan 1 gabisa dikurangin lagi
                        if (item.qty > 1) {
                            return { ...item, qty: item.qty - 1 };
                        }
                    }
                }
                return item;
            });
        });
    }

    function deleteProduct(id) {
        setCart((prev) => {
            // Filter data cart, selain yang mau dihapus
            return prev.filter((item) => item.id !== id);
        })
    }

    function deleteAll() {
        setCart([]);
    }

    function checkout() {
        if (cart.length > 0) {
            navigate("/checkout");
        }
    }

    function finishPayment() {
        setCart([]);
    }

    // Debugging
    // console.log(cart);

    return (
        <CartContext.Provider value={{ cart, updateCart, updateQtyProduct, deleteProduct, deleteAll, checkout, finishPayment }}>
            {children}
        </CartContext.Provider>
    )
}