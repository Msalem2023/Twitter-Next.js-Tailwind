interface InputProps{
    placeholder:string,
    value:string,
    disabled:boolean,
    type:string,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}
const Input:React.FC<InputProps>=({
    placeholder,
    value,
    disabled,
    type,
    onChange
})=>{
    return(
        <input className="w-full p-4 rounded-md border-neutral-800 bg-black border-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-neutral-700 text-white outline-none focus:bg-sky-500 focus:border-2" type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange} />

    )

}
export default Input