"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { MenuSquare, X } from "lucide-react";
import { IUser } from "@/lib/mongodb";

const Menu = [
  {
    name:"Home",
    id:"home-section"
  },{
    name:'About',
    id:"about-section"
  },{
    name:"Portfolio",
    id:"portfolio-section"
  },{
    name:"Services",
    id:"services-section"
  }
];

interface navbarProps {
  profile: IUser;
}

const Navbar = ({ profile }: navbarProps) => {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuth = !!userId;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollTo = (id:string) => {
    const portfolioSection = document.getElementById(id);

    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
    }
  };


  return (
    <>
      {!isMenuOpen && (
        <nav className="bg-[#FBDE4B] w-full h-14 flex justify-between items-center p-8 sticky z-50">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:h-10 lg:w-10 md:flex hidden md:h-7 md:w-7"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#f24e1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16" />
                <path d="m7.5 4.21l4.5 2.6l4.5-2.6m-9 15.58V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
              </g>
            </svg>
            <h3 className="font-bold text-[#f24e1e] lg:text-2xl md:text-lg md:flex hidden font-poppins">
              CodingBucket
            </h3>
            <MenuSquare
              className="md:hidden flex"
              onClick={() => toggleMenu()}
            />
          </div>
          <div className="md:flex hidden items-center gap-10">
            {Object.values(Menu).map((item, i) => (
              <div key={`list-${i}`} className="gap-16">
                <button
                  onClick={()=>scrollTo(item.id)}
                  className="lg:text-2xl md:text-lg font-semibold no-underline hover:underline decoration-[#f24e1e]"
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-8">
            {!isAuth ? (
              <>
                <Link
                  href="/sign-in"
                  className="font-bold font-karla text-lg hover:text-rose-500"
                >
                  Login
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-center rounded-full"
                >
                  <Link href="/sign-up" className="font-bold font-karla">
                    Sign up
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={`/dashboard/overview/${userId}`}
                  className="font-semibold text-sm items-center flex  px-4 py-2 hover: hover:bg-gradient-to-tl font-poppins focus:ring-0 focus:outline-none focus:ring-slate-700 inset-0  hover:bg-white hover:border-none text-white bg-gradient-to-tr from-purple-300 via-purple-400 to-purple-500 "
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </nav>
      )}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-10 h-screen">
          <div className="md:hidden sticky inset-0 w-[300px]  bg-yellow-400 z-50 h-screen">
          <div className="flex items-center justify-between gap-16">
                <div className="flex items-center gap-2 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#f24e1e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16" />
                      <path d="m7.5 4.21l4.5 2.6l4.5-2.6m-9 15.58V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                    </g>
                  </svg>
                  <h3 className="font-bold text-[#f24e1e] text-lg font-poppins">
                    CodingBucket
                  </h3>
                </div>

                <X onClick={() => toggleMenu()} />
              </div>
            <div className="flex flex-col items-center h-full">
              {Object.values(Menu).map((item, index) => (
                <button
                  onClick={()=>{
                    scrollTo(item.id)
                    toggleMenu()
                  }}
                  key={index}
                  className="text-white text-xl font-semibold py-4 px-8 hover:bg-black hover:bg-opacity-25 w-full"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
