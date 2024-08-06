import { useAuth } from "@/Hooks/useCurrentUser"
import axios from "axios"
import { useQuery } from "react-query"
import PostItem from "./postItem"


interface postProps{
    userId:string
}
const Post:React.FC<postProps> = ({userId}) => {

    const { user } = useAuth()
    console.log(user)
    const { data } = useQuery(["Home"], () => {
        return axios.post('http://localhost:4000/Post/posts',{}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        }).then((res) => res.data)
    })
    let posts = []
    if (userId) {
        for (let i = 0; i < data.Posts.length; i++) {
            if (data?.Posts[i]?.userId?.id === userId) {
                let element = data?.Posts[i]
                posts.push(element)
            }
        }
    }
    return (
        <>
        {userId?posts.map((post:Record<string,any>)=>(
            <PostItem key={post.id} userId={userId} data={post}/>
        )):data?.Posts.map((post:Record<string,any>)=>(
            <PostItem key={post.id} userId={userId} data={post}/>
        ))}
        </>
    )
}

export default Post