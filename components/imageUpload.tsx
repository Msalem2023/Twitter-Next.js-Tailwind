import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface ImageUploadProps{
    value:string,
    label:string,
    disabled:boolean,
    onChange:(base64:string)=>void

}
const ImageUpload:React.FC<ImageUploadProps>=({
    value,
    label,
    disabled,
    onChange
})=>{
    const[base64,setBase64]=useState(value)
    const handelChange=useCallback((base64:string)=>{
        onChange(base64)

    },[onChange])
    const handelDrop=useCallback((files:any)=>{
        const file=files[0]
        const reader=new FileReader()
        reader.onload=(event:any)=>{
            setBase64(event.target.result)
            handelChange(event.target.result)
        }
        reader.readAsDataURL(file)

    },[handelChange])
    const{getRootProps,getInputProps}=useDropzone({maxFiles:1,onDrop:handelDrop,disabled:disabled,accept:{"image/jpeg":[],"image/png":[]

    }})
    return(
        <div {...getRootProps({
            className:"w-full text-white text-center p-4 border-2 border-dotted rounded-md border-neutral-700"
        })}>
            <input {...getInputProps()}/>
            {base64?(
                <div className="flex items-center justify-center">
                    <img src={base64}  style={{borderRadius:"50%",width:"100px",height:"100px"}} alt="Upload Image"/>
                </div>
            ):(
                <p className="text-white">
                    {label}
                </p>
            )}

        </div>
    )
}

export default ImageUpload