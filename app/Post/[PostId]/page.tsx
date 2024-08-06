"use client"
import Form from "@/components/form";
import Header from "@/components/Header";
import Comments from "@/components/Post/Comments";
import PostItem from "@/components/Post/postItem";
import { useAuth } from "@/Hooks/useCurrentUser";
import axios from "axios";
import { useQuery } from "react-query";
interface Params {
    PostId: string;
  }
const Post: React.FC<{ params: Params}>=({params})=>{
    const { user } = useAuth();
    const { data } = useQuery(["SpecificPost"], () => {
        return axios.post(`http://localhost:4000/Post/posts/${params.PostId}`, {}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user?.token}`
            }
        }).then((res) => res.data)
    })
    console.log(data?.post)
    return(
        <div>
            <Header label="Tweet" showBachArrow/>
            <PostItem data={data?.post}/>
            <Form postId={params.PostId} isComment placeholder="Tweet your reply"/>
            <Comments comments={data?.post.Comments}/>
        </div>
    )
}
export default Post