"use client"
import { useAuth } from "@/Hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import useLoginModal from "@/Hooks/useLogInModal"
import Avatar from "../Avatar"


interface SideBarItemProps {
    label: string,
    href?: string,
    icon: IconType
    onClick?: () => void
}
const SideBarItem: React.FC<SideBarItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick
}) => {
    const router = useRouter()
    const { user } = useAuth()
    const LogIn = useLoginModal()
    const handelClick = useCallback(() => {
        if (onClick) {
            onClick()
        }
        if (!user) {
            LogIn.onOpen()
        } else if (href) {
            router.push(href)
        }

    }, [router, onClick, href, LogIn, user])
    return (
        <div onClick={handelClick} className="flex flex-row items-center">
            <div className="lg:hidden justify-center flex relative items-center hover:bg-slate-300 hover:bg-opacity-10 rounded-full cursor-pointer p-4 h-14 w-14 n">
                <Icon size={28} color="white" />
            </div>
            <div className="hidden relative items-center hover:bg-slate-300 hover:bg-opacity-10 rounded-full cursor-pointer p-4 lg:flex gap-4 ">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SideBarItem