import { Modal, ModalBody } from "flowbite-react";
import { HiCheckCircle, HiX } from "react-icons/hi";
import { FcApproval } from "react-icons/fc";

export default function ModalPaymentCheckout({ show, onClose }) {
    return (
        <Modal show={show} size="sm" onClose={onClose}>
            <ModalBody className="relative text-center py-8">
                <button
                    className="absolute top-1 left-1 p-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                >
                    <HiX style={{ fontSize: "20px" }} />
                </button>
                <FcApproval className="mx-auto mb-4 text-green-400" style={{ fontSize: "72px" }} />
                <p className="text-gray-300 font-semibold text-lg">Pembelian Produk telah Dilakukan!</p>
            </ModalBody>
        </Modal>
    );
}
