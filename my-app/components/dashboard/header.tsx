"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileAvatar from "../custom-ui/ProfileAvatar";
import { currentUser } from "@/lib/current-user";
import { useUserStore } from "@/lib/userStore";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const {user,fetchUser} = useUserStore()

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <>
    <div className="flex flex-col">
      <div className="flex items-center justify-end mr-6 mt-2 ">
      <ProfileAvatar imageSrc={user?.user_image}/>
      </div>
    <div className="xl:p-12 p-6 flex items-center justify-center font-poppins">
        <h1 className="flex gap-4 font-bold xl:text-[40px] text-[35px] text-black">{title}</h1>
      </div>
    </div>
      
    </>
  );
};

export default Header;
