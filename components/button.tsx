
interface ButtonProps{
    label:string,
    secondary:boolean,
    fullwidth:boolean,
    large:boolean,
    onClick:()=>void,
    disabled:boolean,
    outline:boolean
}
const Button:React.FC<ButtonProps> =({
    label,
    secondary,
    fullwidth,
    large,
    onClick,
    disabled,
    outline
})=>{
return(
    <button disabled={disabled} onClick={onClick} className={`rounded-full p-2 disabled:opactiy-70 disabled:cursor-not-allowed font-semibold transition border-2 ${secondary?"bg-white text-black border-black":"bg-sky-500 text-white border-sky-500"}${outline?"bg-transparent border-white text-white":""} bg-sky-500 ${fullwidth?"w-full":"w-fit"}${large?"text-xl":"text-md"} `} >
        {label}
    </button>

)
}
export default Button