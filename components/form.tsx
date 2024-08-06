"use client"
import { useAuth } from "@/Hooks/useCurrentUser"
import useLoginModal from "@/Hooks/useLogInModal"
import useRegisterModal from "@/Hooks/useRegisterModal"
import { useState } from "react"
import Button from "./button"
import Avatar from "./Avatar"
import { useMutation } from "react-query"
import {  handelPostComment, Post } from "./Http"
import toast from "react-hot-toast"
import { client } from "@/app/layout"

interface FormProps {
    isComment: boolean,
    placeholder: string,
    postId: string
}
const Form: React.FC<FormProps> = ({
    isComment,
    placeholder,
    postId
}) => {
    const RegisterModal = useRegisterModal()
    const LogInModal = useLoginModal()
    const { user } = useAuth()
    const [body, setBody] = useState("")

    const { mutate } = useMutation({
        mutationFn: Post,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
            toast.success("Info has been modified successfully");
            setBody('')
        }
    })
    const { mutate: PostComment } = useMutation({
        mutationFn: handelPostComment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["SpecificPost"] })
            toast.success("Comment has been modified successfully");
            setBody('')
        }
    })
    const handlePost = async () => {
        try {
            if (!user) {
                throw new Error("Token is undefined or null");
            }
            await mutate({ user, body });
        } catch (error) {
            console.error("Error handling comment:", error);
        }
    }
    const PostComments = async () => {
        try {
            if (!user) {
                throw new Error("Token is undefined or null");
            }
            console.log(postId)
            await PostComment({ user, body, postId });
        } catch (error) {
            console.error("Error handling comment:", error);
        }
    }
    const trigger = () => {
        if (placeholder === "Share your thoughts") {
            handlePost()
        } else {
            PostComments()
        }
    }
    return (
        <div className="border-b-[1px] border-neutral-700 px-5 py-2">
            {user?.token ? (
                <div className="flex flex-row items-center gap-4">
                    <div style={{ width: "200px" }} className="w-full">
                        <Avatar profileImage={user.user.profileImage} userId={user.user.id} />
                    </div>
                    <div className="w-full">
                        <textarea placeholder={placeholder} className="disabled-opacity-80 resize-none mt-3 w-full bg-black text-[20px] outline-none placeholder-neutral-500 text-white" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <hr className="opacity-0 peer-focus:opacity-100 h-[1px] border-neutral-800 w-full transition " />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button onClick={trigger} label="Tweet" />
                        </div>
                    </div>

                </div>) : (

                <div className="py-8">
                    <p className="text-white text-3xl font-bold text-center">Welcome to Twitter</p>
                    <div className="flex flex-row gap-4 items-center justify-center mt-2">
                        <Button onClick={LogInModal.onOpen} label="Log In" />
                        <Button secondary onClick={RegisterModal.onOpen} label="Register" />


                    </div>
                </div>
            )}
        </div>
    )
}

export default Form