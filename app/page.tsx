"use client"
import Image from "next/image";
import Header from "@/components/Header";
import Form from "@/components/form";
import Post from "@/components/Post/post";
import { useAuth } from "@/Hooks/useCurrentUser";

export default function Home() {
  const {user}=useAuth()
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="Share your thoughts"/>
      {user?.token &&(<Post/>)}
    </div>

  );
}
