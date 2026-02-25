import { Card } from "flowbite-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
    const { cart, updateQtyProduct, deleteProduct, deleteAll } = useContext(CartContext);
    return (
        <>
            <Card className="w-4xl block mx-auto my-15">
                <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Data Keranjang</h5>
                    <p onClick={() => deleteAll()} className="text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        Kosongkan Keranjang
                    </p>
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
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                <b>x{item.qty}</b>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                                    </div>
                                    <div className="flex justify-end">
                                        <ButtonGroup>
                                            <Button color="blue" onClick={() => updateQtyProduct(item.id, "-")}>-</Button>
                                            <Button color="alternative" disabled>{item.qty}</Button>
                                            <Button color="blue" onClick={() => updateQtyProduct(item.id, "+")}>+</Button>
                                        </ButtonGroup>
                                        <FaTrash onClick={() => deleteProduct(item.id)} color="red " className="ms-2 text-xl mt-3"></FaTrash>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Card>
        </>
    )
}