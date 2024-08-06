import { useMemo } from "react"
import Avatar from "../Avatar"
import { formatDistanceToNowStrict } from "date-fns"
import Button from "../button"
import { useMutation } from "react-query"
import {  Destroy } from "../Http"
import { useAuth } from "@/Hooks/useCurrentUser"
import toast from "react-hot-toast"
import { client } from "@/app/layout"

interface CommentItemProps {
    data: Record<string, any>
}
const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const{user}=useAuth()
    console.log(data)
    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])

    const { mutate: destroy } = useMutation({
        mutationFn: Destroy,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["SpecificPost"] })
            toast.success("Comment deleted")
        }
    })

    const deleteComment = async (user:string,id:string) => {
        destroy({ user,id })

    }


    return (
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data?.userId?.id} profileImage={data?.userId?.profileImage} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-white font-semibold hover:underline cursor-pointer">
                            {data?.userId.name}
                        </p>
                        <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block ">
                            @{data.userId.UserName}
                        </span>
                        <span>
                            {createdAt}
                        </span>

                    </div>
                    <div className="text-white mt-3">
                        {data.Comment}
                    </div>

                </div>
            </div>
            <div className="m-4 flex flex-row justify-end">
                <button onClick={()=>deleteComment(user,data._id)} className="bg-red-800 p-2 text-white rounded-full hover:bg-opacity-70 cursor-pointer ">
                    Delete
                </button>
            </div>

        </div>

    )
}
export default CommentItem