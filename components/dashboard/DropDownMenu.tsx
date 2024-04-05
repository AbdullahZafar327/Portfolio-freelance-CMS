"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { currentUser, useAuth } from "@clerk/nextjs";

interface DropDownMenuProps {
  handleChange: () => void;
  isDeleting: Boolean;
}

const DropDownMenu = ({ handleChange, isDeleting }: DropDownMenuProps) => {
  const {userId} = useAuth()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-white">
          <MoreVerticalIcon className="text-white hover:bg-white hover:bg-opacity-25 transition ease-in-out cursor-pointer rounded-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* //@ts-ignore */}
          <DropdownMenuItem
            onClick={handleChange}
            className={`cursor-pointer flex items-center justify-between ${isDeleting && "flex items-center justify-center cursor-not-allowed"}`}
          >
            {isDeleting ? (
              <img src="/arrows.png" alt="Deleting" width={20} height={20} className="animate-spin"/>
            ) : (
              <>Delete</>
            )}
            <Image src="/trash.png" alt="delete" width={20} height={20} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center justify-between"
          >
            <Link href={`/dashboard/projects/${userId}`} className="flex items-center justify-between w-full">
              Edit
              <Image src="/editable.png" alt="edit" width={20} height={20} />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenu;
