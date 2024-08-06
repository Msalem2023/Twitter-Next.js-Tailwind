"use client"
import useRegisterModal from "@/Hooks/useRegisterModal"
import { useCallback, useState } from "react"
import Input from "../input"
import Modal from "../modal"
import useLoginModal from "@/Hooks/useLogInModal"
import axios from "axios"
import toast from "react-hot-toast"

const RegisterModal = () => {
    const RegisterModal = useRegisterModal()
    const LogInModal = useLoginModal()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [CPassword, setCfPassword] = useState("")
    const [UserName, setUserName] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
           const response= await axios.post("http://localhost:4000/user/SignUp", {
                Email,
                Password,
                UserName,
                CPassword
            }, {
                headers: {
                    'content-type': 'application/json',
                }
            }).then(res=>{
                console.log(res)
            })
            RegisterModal.onClose()
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
            toast.success("Please Confirm Your Email")
        }
    }, [UserName, Email, Password, CPassword])
    const onToggle = useCallback(() => {
        RegisterModal.onClose()
        LogInModal.onOpen()

    }, [RegisterModal, LogInModal])
    const body = (
        <div className="flex flex-col gap-4">
            <Input value={Email} placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input value={UserName} placeholder="User Name" type="text" onChange={(e) => setUserName(e.target.value)} disabled={isLoading} />
            <Input value={Password} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            <Input value={CPassword} placeholder="Confirm your password" type="password" onChange={(e) => setCfPassword(e.target.value)} disabled={isLoading} />


        </div>
    )
    const footer = (
        <div className="text-center text-neutral-400 mt-4">
            <p>Already have an account? <span onClick={onToggle} className="hover:text-underline cursor-pointer text-white">Sign In</span></p>
        </div>
    )
    return (
        <Modal footer={footer} actionLabel="Register" onClose={RegisterModal.onClose} onSubmit={onSubmit} title="Create an account" body={body} disabled={isLoading} isOpen={RegisterModal.isOpen} />
    )
}

export default RegisterModal