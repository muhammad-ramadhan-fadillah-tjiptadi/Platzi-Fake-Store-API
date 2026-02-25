import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Card } from "flowbite-react";

export default function ModalCartComp({ handleCloseModal, openModal, item }) {
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
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item.price}</div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
                <Button onClick={() => handleCloseModal()}>Batal</Button>
                <Button color="alternative">
                    Keranjang
                </Button>
            </ModalFooter>
        </Modal>
    )
}