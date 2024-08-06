"use client";

import Header from '@/components/Header';
import Post from '@/components/Post/post';
import PostItem from '@/components/Post/postItem';
import User from '@/components/users/user';
import UserBio from '@/components/users/userBio';
import { useAuth } from '@/Hooks/useCurrentUser';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ClipLoader } from 'react-spinners';

interface Params {
  userId: string;
}





const UserPage: React.FC<{ params: Params}> = ({ params }) => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery(
    ["Profile"],
    () => 
      axios.post(`http://localhost:4000/user/${params.userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      }).then(res => res.data)
  );


  if (isLoading) return(
    <div className='flex justify-center items-center h-full'>
        <ClipLoader/>

    </div>
  )
  if (isError) return (<div className='flex justify-center items-center h-full'>
    <ClipLoader/>

</div>)
const Followers=[]
for (let i = 0; i < data?.user?.Followers?.length; i++) {
    Followers.push( data.user.Followers[i].Following)
}
const Following=[]
for (let i = 0; i < data?.user?.Following?.length; i++) {
    Following.push( data.user.Following[i].Followers)
}
const find=Followers?.find(e=>JSON.stringify(e?.id)===JSON.stringify(data.loggedInUser))



  return (
    <div>
        <Header showBachArrow label={data?.user?.UserName}/>
        <User profileImage={data?.user?.profileImage} coverImage={data?.user?.coverImage} userId={params.userId as string}/>
        <UserBio label={find ? "Following" : "follow"} bio={data?.user?.bio} Followers={data?.user?.Followers.length} Following={data?.user?.Following?.length} Email={data?.user?.Email} UserName={data?.user?.UserName} id={data?.loggedInUser} createdAt={data?.user?.createdAt} userId={params.userId}/>
        {user?.token &&<Post userId={params.userId as string} />}
    </div>
  );
};

export default UserPage;
