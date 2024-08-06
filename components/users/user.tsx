"use client"
import Image from "next/image"
import Avatar from "../Avatar"

interface UserDetails {
    UserName: string;
    Email: string;
    Image:string,
    coverImage:string
    userId:string,
    profileImage:string
  }

const User:React.FC<UserDetails>=({
    UserName,
    Email,
    Image,
    coverImage,
    userId,
    profileImage
})=>{
    return(
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {coverImage&&(<img  src={coverImage} alt="cover image" style={{objectFit:"cover",width:"100%",height:"100%"}} />)}
                {profileImage?(<div className="absolute -bottom-16 left-4">
                    <Avatar profileImage={profileImage} userId={userId} isLarge hasBorder/>
                </div>):(<div>
                    <Avatar profileImage={profileImage!==undefined?profileImage:"https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"} userId={userId} isLarge hasBorder/>
                </div>)}
                 
            </div>
        </div>
    )
    
}

export default User