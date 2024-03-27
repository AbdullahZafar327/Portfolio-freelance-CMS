"use client";
import React from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import {
  BarChart4,
  CreditCard,
  FolderCheck,
  FolderRoot,
  Home,
  UserRound,
} from "lucide-react";

const MenuItems = ({ Id }: { Id: string }) => {
  const menuItems = [
    {
      group: "General",
      items: [
        {
          link: `/dashboard/overview/${Id}`,
          icon: <BarChart4 />,
          text: "Overview",
        },
        {
          link: `/dashboard/projects/${Id}`,
          icon: <FolderRoot />,
          text: "Projects",
        },
        {
          link: "/completedProjects",
          icon: <FolderCheck />,
          text: "Completed Projects",
        },
        {
          link: "/",
          icon: <Home />,
          text: "Home",
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/profile",
          icon: <UserRound />,
          text: "profile",
        },
        {
          link: "/billing",
          icon: <CreditCard />,
          text: "billing",
        },
      ],
    },
  ];

  return (
    <div className="w-full p-2 bg-none">
      <Command className="bg-white/50 p-4 h-full">
        <CommandList className="space-y-4">
          {menuItems.map((menu, index) => (
            <React.Fragment key={`menu-${index}`}>
              <CommandGroup key={`group-${index}`} heading={menu.group} className="text-xl">
                {menu.items.map((item, itemIndex) => (
                  <Link href={`${item.link}`} key={`link-${itemIndex}`}>
                    <CommandItem key={`item-${itemIndex}`} className="flex gap-2">
                      {item.icon}
                      {item.text}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              {index < menuItems.length - 1 && <CommandSeparator key={`separator-${index}`} />}
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default MenuItems;
