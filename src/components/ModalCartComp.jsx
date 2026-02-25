import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Card } from "flowbite-react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ModalCartComp({ handleCloseModal, openModal, item }) {
    const [qty, setQty] = useState(1);
    const { updateCart } = useContext(CartContext);
    const { isLogin } = useContext(AuthContext);
    function updateQty(type) {
        if (type === "+") {
            // Prev : parameter bawaan state, untuk ambil nilai sebelumnya
            setQty((prev) => prev + 1);
        } else {
            // Kalau state nya udah di 1 gabisa dikurangin lagi
            if (qty > 1) {
                setQty((prev) => prev - 1);
            }
        }
    }

    const navigate = useNavigate();
    function handleCart() {
        if (isLogin == null) {
            navigate("/login");
        }
        updateCart(item, qty);
        handleCloseModal();
    }

    return (
        <Modal dismissible show={openModal} onClose={() => handleCloseModal()}>
            <ModalHeader>Tambah Ke Keranjang</ModalHeader>
            <ModalBody>
                <div className="space-y-6">
                    <div className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img
                                    alt="Neil image"
                                    height="50"
                                    src={item.images ? item.images[0] : ''}
                                    width="50"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <ButtonGroup>
                        <Button color="blue" onClick={() => updateQty("-")}>-</Button>
                        <Button color="alternative" disabled>{qty}</Button>
                        <Button color="blue" onClick={() => updateQty("+")}>+</Button>
                    </ButtonGroup>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
                <Button onClick={() => handleCloseModal()}>Batal</Button>
                <Button color="alternative" onClick={() => handleCart(item, qty)}>
                    Keranjang
                </Button>
            </ModalFooter>
        </Modal>
    )
}