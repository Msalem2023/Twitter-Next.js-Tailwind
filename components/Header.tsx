"use client"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { BiArrowBack } from "react-icons/bi"

interface HeaderProps{
    label:string,
    showBachArrow?:boolean
}
const Header:React.FC<HeaderProps> = ({
    label,
    showBachArrow
}) => {
    const router=useRouter()
    const handelBack=useCallback(()=>{
        router.back()
    },[router])
    return (
        <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row gap-2 items-center">
                {showBachArrow&&(<BiArrowBack onClick={handelBack} size={28} color="white" className="hover:opacity-70 cursor-pointer transition"/>)}
                <h1 className="text-white text-xl font-semibold">{label}</h1>
            </div>
        </div>
    )
}

export default Header