"use client"
import { useCallback } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./button"

interface ModalProps {
    title: string,
    isOpen?: boolean,
    onClose: () => void,
    onSubmit: () => void,
    body: React.ReactElement,
    footer: React.ReactElement,
    actionLabel: string,
    disabled: boolean
}
const Modal: React.FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    onSubmit,
    body,
    footer,
    actionLabel,
    disabled
}) => {
    const handelClose = useCallback(() => {
        if (disabled) {
            return
        }
        onClose()

    }, [disabled, onClose])
    const handelSubmit = useCallback(() => {
        if (disabled) {
            return
        }
        onSubmit()

    }, [onSubmit, disabled])
    if (!isOpen) {
        return null
    }
    return (
        <>
            <div className="flex justify-center items-center bg-neutral-800 overflow-x-hidden overflow-y-auto z-50 bg-opacity-70 outline-none focus:outline-none fixed inset-0">
                <div className="w-full lg:w-3/6 my-6 m-x-auto lg:max-w-3xl h-full lg:h-auto">
                    <div className="w-full h-full rounded-lg shadow-lg bg-black outline-none focus:outline-none flex flex-col border-0">
                        <div className="flex justify-center items-center p-10 rounded-t">
                            <h3 className="text-3xl font-semibold text-white">{title}</h3>
                            <button onClick={handelClose} className="border-0 text-white p-1 hover-opacity-70 ml-auto ">
                                <AiOutlineClose size={20} />
                            </button>

                        </div>
                        <div className="p-10 flex-auto ">
                            {body}
                        </div>
                        <div className="gap-2 p-10 flex flex-col">
                            <Button large secondary fullwidth  disabled={disabled} label={actionLabel} onClick={handelSubmit}/>
                            {footer}
                        </div>

                    </div>

                </div>

            </div>
        </>

    )
}
export default Modal