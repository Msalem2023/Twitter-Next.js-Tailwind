import CommentItem from "./CommentItem"

interface CommentsProps{
    comments:Record<string,any>[]
}
const Comments:React.FC<CommentsProps>=({comments})=>{
    console.log(comments)
    return(
       <>
       {comments&&comments?.map((comment)=>(
         <CommentItem key={comment.id} data={comment} />
        ))} 
       </>
    )
}

export default Comments
