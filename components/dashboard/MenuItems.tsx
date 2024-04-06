"use client";
import React, { useEffect } from "react";
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
  Wrench,
} from "lucide-react";
import { IUser, Role } from "@/lib/mongodb";
import useMenuStore from "@/lib/MenuStore";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/userStore";
import useProjectsStore from "@/lib/projectStore";

const MenuItems = () => {
  const { toggleMenu } = useMenuStore();
  const { activeMenuItemId, setActiveMenuItemId } = useMenuStore();
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const { setIsLoading } = useProjectsStore();

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  const admin = user?.role === Role.Admin;

  const menuItems = [
    {
      group: "General",
      items: [
        {
          id: "1-general",
          link: `/dashboard/overview/${user?.user_id}`,
          icon: <BarChart4 />,
          text: "Overview",
        },
        {
          id: `2-general`,
          link:
            admin && user.user_id
              ? `/dashboard/orders/${user?.user_id}`
              : `/dashboard/projects/${user?.user_id}`,
          icon: <Wrench />,
          text: admin && user.user_id ? "Manage Orders" : "Manage Projects",
        },
        {
          id: "3-general",
          link: `/dashboard/finishedprojects/${user?.user_id}`,
          icon: <FolderCheck />,
          text: admin && user.user_id ? "Delivered" : "Finished",
        },
        {
          id: "4-general",
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
          id: "1-Settings",
          link: `/dashboard/profilesettings/${user?.user_id}`,
          icon: <UserRound />,
          text: "profile",
        },
        {
          id: "2-settings",
          link: `/dashboard/billing/${user?.user_id}`,
          icon: <CreditCard />,
          text: "Payments",
        },
      ],
    },
  ];

  return (
    <div className="w-full p-2 bg-none">
      <Command className="bg-white/50 p-4 h-full ">
        <CommandList className="space-y-4">
          {menuItems.map((menu, index) => (
            <React.Fragment key={`menu-${index}`}>
              <CommandGroup
                key={`group-${index}`}
                heading={menu.group}
                className="text-xl"
              >
                {menu.items.map((item, itemIndex) => (
                  <Link
                    href={`${item.link}`}
                    key={`link-${itemIndex}`}
                    onClick={() => {
                      simulateLoading();
                      setActiveMenuItemId(item.id);
                    }}
                    className="mt-4"
                  >
                    <button onClick={() => toggleMenu()}>
                      <CommandItem
                        key={`item-${itemIndex}`}
                        className={cn(
                          "cursor-pointer gap-2 flex",
                          activeMenuItemId === item.id
                            ? "bg-black text-white"
                            : " hover:text-black hover:bg-opacity-15 hover:bg-black"
                        )}
                      >
                        {item.icon}
                        {item.text}
                      </CommandItem>
                    </button>
                  </Link>
                ))}
              </CommandGroup>
              {index < menuItems.length - 1 && (
                <CommandSeparator key={`separator-${index}`} />
              )}
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default MenuItems;
