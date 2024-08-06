import { FaFeather } from "react-icons/fa"
import useLoginModal from "@/Hooks/useLogInModal"

const SideBarTweetButton = () => {
    const signIn=useLoginModal()
    const Login=()=>{
        signIn.onOpen()
    }
    return (
        <>

            <div  className="h-14 w-14 p-4 lg:hidden rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 bg-sky-500 transition ">
                <FaFeather size={24} color="white" />
            </div>
            <div onClick={Login} className="mt-6 hidden rounded-full p-4 lg:block cursor-pointer bg-sky-500 hover:bg-opacity-90 transition">
                <p className="hidden lg:block text-center text-white font-semibold text-[20px]">
                    Tweet
                </p>
            </div>
        </>
    )
}

export default SideBarTweetButton