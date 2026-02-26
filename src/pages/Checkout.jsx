import { Card, Button } from "flowbite-react";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, finishPayment } = useContext(CartContext);
    const navigate = useNavigate();
    const isFinishing = useRef(false);

    // Guard: jika cart kosong dan bukan sedang proses pembayaran, redirect ke /cart
    useEffect(() => {
        if (cart.length === 0 && !isFinishing.current) {
            navigate("/");
        }
    }, [cart, navigate]);

    // Hitung total harga semua produk
    const totalHarga = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // Biaya aplikasi 11%
    const biayaAplikasi = totalHarga * 0.11;
    // Total akhir setelah ditambah biaya aplikasi1 
    const totalAkhir = totalHarga + biayaAplikasi;

    function handleFinishPayment() {
        isFinishing.current = true;
        navigate("/", { state: { successPayment: true } });
        finishPayment();
    }

    return (
        <>
            <Card className="w-4xl block mx-auto my-15">
                <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Data Checkout</h5>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            cart.map((item, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            <img
                                                alt="Neil image"
                                                height="50"
                                                src={item.image}
                                                width="50"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-300">
                                                <b>x{item.qty}</b>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    {/* Ringkasan Harga */}
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                        <h6 className="font-bold text-gray-900 dark:text-white">Detail Pembayaran</h6>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
                            <span>Total Harga Produk</span>
                            <span className="font-semibold text-gray-900 dark:text-white">${totalHarga.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
                            <span>Biaya Aplikasi</span>
                            <span className="font-semibold text-gray-900 dark:text-white">${biayaAplikasi.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
                            <span>Total Harga Bayar</span>
                            <span>${totalAkhir.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        {cart.length > 0 && (
                            <Button color="green" onClick={handleFinishPayment}>
                                Selesaikan Pembayaran
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </>
    )
}