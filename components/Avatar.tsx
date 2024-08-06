import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface AvatarProps {
    profileImage:string|undefined,
    userId: string|undefined,
    isLarge: boolean,
    hasBorder: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder,profileImage }) => {
    const router = useRouter()
    const onClick = useCallback(() => {
        const url = `/users/${userId}`
        router.push(url)

    }, [router, userId])
    return (
        <div className={`relative ${hasBorder ? "border-4 border-black" : ""} ${isLarge ? "h-32" : "h-12"}${isLarge ? "w-32" : "w-12"} rounded-full hover:opacity-90 cursor-pointer `}>
            <img
                onClick={onClick}
                style={{ objectFit:"cover",width:"100px",height:"100px" ,borderRadius: "50%" }}
                alt="Avatar"
                src={profileImage}
            />
        </div>
    )

}
export default Avatar