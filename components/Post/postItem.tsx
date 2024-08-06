import { useAuth } from "@/Hooks/useCurrentUser"
import Avatar from "../Avatar"
import { useRouter } from "next/navigation"
import useLoginModal from "@/Hooks/useLogInModal"
import { useCallback, useMemo, useState } from "react"
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns"
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { useMutation } from "react-query"
import {  Love } from "../Http"
import toast from "react-hot-toast"
import { client } from "@/app/layout"

interface PostProps {
    data: Record<string, any>,
    userId: string
}
const PostItem: React.FC<PostProps> = ({
    data,
    userId
}) => {
    const { user } = useAuth()
    const router = useRouter()
    const LogIn = useLoginModal()

    const GoToUser = useCallback(() => {
        const url = `/users/${data?.userId?.id}`
        router.push(url)


    }, [router, data?.userId?.id])
    const GoToPost = useCallback(() => {
        const url = `http://localhost:3000/Post/${data.id}`
        router.push(url)
    }, [router, data?.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])
    const { mutate,error } = useMutation({
        mutationFn: Love,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
            toast.success("Great!")
        }
    })
    console.log(data)

    const HandelLove = async (user:any,userId:string) => {
        mutate({user, userId })
    }
    const find=data?.Likes?.find(e=>JSON.stringify(e?.userId)===JSON.stringify(user?.user.id))


    return (
        <div className="border-neutral-800 hover:bg-neutral-900 cursor-pointer p-5 border-b-[1px] transition">
            <div className="flex flex-row gap-3 items-start">
                <Avatar userId={data?.userId}  profileImage={data?.userId?.profileImage} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={GoToUser} className="text-white font-semibold cursor-pointer hover:underline ">

                            {data?.userId?.UserName}
                        </p>
                        <span>{createdAt}</span>
                    </div>
                    <div className="text-white mt-2">
                        {data?.description}
                    </div>
                    <div className="flex flex-row mt-3 gap-3 items-center">
                        <div className="flex flex-row text-neutral-500 gap-2 cursor-pointer hover:text-sky-500">
                            <AiOutlineMessage onClick={GoToPost} size={20} />
                            <p>{data?.Comments?.length}</p>

                        </div>
                        <div className="flex flex-row text-neutral-500 gap-2 cursor-pointer hover:text-red-500">
                            <AiOutlineHeart fill={find&&"red"}  onClick={()=>HandelLove(user,data.id)} size={20} />
                            <p>{data?.Likes?.length}</p>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PostItem