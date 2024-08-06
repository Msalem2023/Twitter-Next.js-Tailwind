"use client"
import useLoginModal from "@/Hooks/useLogInModal"
import { useCallback, useState } from "react"
import Input from "../input"
import Modal from "../modal"
import useRegisterModal from "@/Hooks/useRegisterModal"
import axios from "axios"
import toast from "react-hot-toast"
import { useAuth } from "@/Hooks/useCurrentUser"

const LoginModal = () => {
    const { login } = useAuth();

    const LogInModal = useLoginModal()
    const RegisterModal = useRegisterModal()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            console.log(Email)
            const response= await axios.post("http://localhost:4000/user/SignIn", {
                Email,
                Password,
            }, {
                headers: {
                    'content-type': 'application/json',
                }
            }).then(response=>{
                console.log(response.data.token)
                 login(response.data)
            })
            LogInModal.onClose()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
            toast.success("Welcome Back")
        }

    }, [Email,Password,login,LogInModal])
    const onToggle = useCallback(() => {
        LogInModal.onClose()
        RegisterModal.onOpen()

    }, [RegisterModal, LogInModal])
    const body = (
        <div className="flex flex-col gap-4">
            <Input value={Email} placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input value={Password} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />

        </div>
    )
    const footer = (
        <div className="text-center text-neutral-400 mt-4">
            <p>First time using twitter? <span onClick={onToggle} className="hover:text-underline cursor-pointer text-white">Sign Up</span></p>
        </div>
    )
    return (
        <Modal footer={footer} actionLabel="Sign In" onClose={LogInModal.onClose} onSubmit={onSubmit} title="Log In" body={body} disabled={isLoading} isOpen={LogInModal.isOpen} />
    )
}

export default LoginModal