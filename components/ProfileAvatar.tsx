import React from "react";
import { AvatarFallback, AvatarImage , Avatar } from "./ui/avatar";

interface profileAvatarProps {
  imageSrc:string
}
const ProfileAvatar = ({imageSrc}:profileAvatarProps) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
