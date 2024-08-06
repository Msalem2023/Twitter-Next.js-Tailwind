"use client"
import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SideBarItem from "./SideBarItem"
import SideBarLogo from "./sideBarLogo"
import { BiLogOut } from "react-icons/bi"
import SideBarTweetButton from "./SideBarTweetButton"
import { useCallback } from "react"
import { useAuth } from "@/Hooks/useCurrentUser"


const Sidebar = () => {
    const { user, logout } = useAuth();

    
    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label: "Notification",
            href: "/notifications",
            icon: BsBellFill
        },
        {
            label: "Profile",
            href: `/users/${user?.user?.id}`,
            icon: FaUser
        },



    ]
    console.log(user)
    return (
        <div className=" h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[238px]">
                    <SideBarLogo />
                    {items.map((e) => (
                        <SideBarItem user={user} key={e.href} href={e.href} label={e.label} icon={e.icon} onClick={() => { }} />
                    ))}
                    {user&&<SideBarItem onClick={logout} icon={BiLogOut} label="Log Out" />}
                    <SideBarTweetButton />

                </div>

            </div>

        </div>
    )
}
export default Sidebar