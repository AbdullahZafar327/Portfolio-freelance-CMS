import React from 'react'
import { Separator } from './ui/separator'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@/lib/current-user'
import { LogOut } from 'lucide-react'
import MenuItems from './MenuItems'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const NavigationSidebar = async () => {
    const user = await currentUser()
    if(!user){
      redirect('/')
    }

    
  return (
   <div className="flex flex-col min-w-[300px] min-h-screen w-[300px] p-4 " style={{
    background:"linear-gradient(to right bottom ,rgba(246,11,52,0.3),rgba(82,185,132,0.2))"
   }}>
     <div className="p-4 flex items-center gap-2">
      <Link href="/" className="flex items-center">
     <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="#f24e1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"/><path d="m7.5 4.21l4.5 2.6l4.5-2.6m-9 15.58V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></g></svg>
        <h1 className="font-bold text-center text-2xl text-rose-500">
            CodingBucket
        </h1>
      </Link>
     </div>
    <Separator/>
     <div className='grow'>
         <MenuItems Id={user._id}/>
     </div>
     <div className="bg-white/40 w-full flex items-center justify-center h-[100px] rounded-3xl">
        <div className="flex items-center gap-2">
        <LogOut/>
        <UserButton/>
       <h1 className='font-semibold text-xl'>
          {user.user_name}
       </h1>
        </div>
     </div>
   </div>
  )
}

export default NavigationSidebar
