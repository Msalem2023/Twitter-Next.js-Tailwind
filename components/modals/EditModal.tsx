"use client";
import useEditModal from "@/Hooks/useEditModal";
import Modal from "../modal";
import Input from "../input";
import { useState } from "react";
import { useMutation } from "react-query";
import {  Update } from "../Http";
import { useAuth } from "@/Hooks/useCurrentUser";
import toast from "react-hot-toast";
import ImageUpload from "../imageUpload";
import { client } from "@/app/layout";

// Define the EditModal component
const EditModal = () => {
  const Edit = useEditModal();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  
  // Ensure user is defined and has a token
//   if (!user?.token) {
//     console.error("User token is missing");
//     return null;
//   }


  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: Update,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Profile","Other"] });
      toast.success("Info has been modified successfully");
      Edit.onClose();
    },
    onError: () => {
      toast.error("An error occurred while updating info");
    }
  });

  const onSubmit = async () => {
    if (!user?.token) {
      toast.error("Authentication token is missing");
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Submitting data...");
      await mutate({ bio, name, userName, user,profileImage,coverImage });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  console.log("Rendering EditModal component");

  const body = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image)} label="upload profile Image"/>
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image)} label="upload cover Image"/>
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="UserName"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      body={body}
      onSubmit={onSubmit}
      disabled={isLoading}
      isOpen={Edit.isOpen}
      title="Edit your Profile"
      actionLabel="Save"
      onClose={Edit.onClose}
    />
  );
};

export default EditModal;
