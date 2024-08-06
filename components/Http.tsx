import axios from "axios";


interface User {
  token: string;
}

interface UpdateParams {
  bio: string;
  name: string;
  userName: string;
  user: User;
  coverImage: File;
  profileImage: File;
  body: string
  userId: string
  postId: string
  id: string
}

export async function Update({ bio, name, userName, user, profileImage, coverImage }: UpdateParams) {
  const formData = new FormData();
  formData.append("bio", bio);
  formData.append("name", name);
  formData.append("userName", userName);
  formData.append("profileImage", profileImage)
  formData.append("coverImage", coverImage)
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${user.token}` 
    }
  };

  try {
    const res = await axios.put('http://localhost:4000/user/upload', formData, config);
    console.log(res);
    return res.data; 
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
export async function handelPostComment({ user, body, postId }: UpdateParams) {
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${user.token}`
    }
  }
  const res = await axios.post('http://localhost:4000/Comment/comment', { body, postId }, config)
}
export async function Post({ user, body }: UpdateParams): Promise<void> {
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${user.token}`
    }
  }
  const res = await axios.put('http://localhost:4000/Post/CreatePost', { body }, config)

}
export async function Follow({ user, userId: id }: UpdateParams) {
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${user.token}`
    }
  }
  const res = await axios.post('http://localhost:4000/Friends/Friendship', { id }, config)
}
export async function Love({ user, userId: id }: UpdateParams) {
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${user.token}`
    }
  }
  const res = await axios.post('http://localhost:4000/Like/like', { id }, config)
}
export async function Destroy({ user, id }: UpdateParams) {
  console.log(id)
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${user.token}`
    }
  }
  const res = await axios.delete(`http://localhost:4000/Comment/${id}`, config)


}