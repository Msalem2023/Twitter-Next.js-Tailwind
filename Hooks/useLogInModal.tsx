import {create} from "zustand"

interface logInModalStore{
    isOpen:boolean,
    onClose:()=>void
    onOpen:()=>void
}
const useLoginModal=create<logInModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})

}))

export default useLoginModal