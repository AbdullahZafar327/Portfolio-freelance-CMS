import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from 'lucide-react';

interface DropDownMenuProps {
    handleChange:()=>void
}

const DropDownMenu = ({handleChange}:DropDownMenuProps) => {
    
  return (
    <div>
       <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVerticalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* //@ts-ignore */}
                <DropdownMenuItem onClick={handleChange}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
    </div>
  )
}

export default DropDownMenu
