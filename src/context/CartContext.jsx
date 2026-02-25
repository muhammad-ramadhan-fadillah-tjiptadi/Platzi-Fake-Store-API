import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

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
        // Debugging
        // console.log(cart);
    }
    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    )
}