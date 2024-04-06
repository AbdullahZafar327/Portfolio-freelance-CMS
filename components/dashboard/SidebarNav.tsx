"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import MenuItems from './MenuItems';
import Image from 'next/image';

import useMenuStore from '@/lib/MenuStore';
import { useUserStore } from '@/lib/userStore';

const SidebarNav = () => {
  const user = useUserStore((state)=>state.user)
  const fetchUser = useUserStore((state)=>state.fetchUser)
  const { isOpen, toggleMenu } = useMenuStore();

  useEffect(()=>{
   fetchUser()
  },[])

  
  

  return (
    <>
      {isOpen ? (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 w-full h-screen z-10">
          <div
            className="md:hidden z-20 sticky flex flex-col min-w-[300px] min-h-screen w-[300px] p-4 bg-gradient-tr from-purple-400 via purple-500 to-violet-600"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="p-4 flex items-center gap-2 justify-between">
              <Link href="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16" />
                    <path d="m7.5 4.21l4.5 2.6l4.5-2.6m-9 15.58V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                  </g>
                </svg>
                <h1 className="font-bold text-center text-lg text-black font-poppins " >
                  CodingBucket
                </h1>
              </Link>
              <div>
                <button onClick={()=>toggleMenu()}>
                <X className='hover:bg-white rounded-full'/>
                </button>
              </div>
            </div>
            <Separator />
            <div className="grow"><MenuItems/></div>
            <div className="bg-white/40 w-full flex items-center justify-center h-[100px] rounded-3xl">
              <div className="flex items-center gap-2">
                <LogOut />
                <UserButton/>
                <h1 className="font-semibold text-xl"></h1>
              </div>
            </div>
          </div>
        </div>
      ):(
        <div className='md:hidden w-full flex p-4'>
           <button onClick={()=>toggleMenu()}>
            <Image src="/menu.png" alt="sidebarNav" height={30} width={30}/>
           </button>
        </div>
      )}
    </>
  );
};

export default SidebarNav
