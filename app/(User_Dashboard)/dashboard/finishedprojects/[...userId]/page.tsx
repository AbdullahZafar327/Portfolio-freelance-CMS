import Header from '@/components/dashboard/header'
import CompletedProject from '@/components/projectCards/CompletedProject'
import { currentUser } from '@/lib/current-user'
import ConnectedToDb from '@/lib/dbConnection'
import { IProject, Project, status } from '@/lib/mongodb'
import { redirectToSignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const page = async () => {
    const user = await currentUser()
    await ConnectedToDb()
    if(!user){
        return redirectToSignIn()
    }

    const Finished_Projects = await Project.find({project_status:status.completed,project_user:user?._id})
    const Plain_F_Projects = JSON.parse(JSON.stringify(Finished_Projects))

  return (
    <div className='h-screen lg:h-full'>
      <Header title="Download Project Files"/>
      {Finished_Projects.length < 0 ? (
         <div className='flex items-center justify-center w-full h-full'>
           <h1>Project is not completed yet.Please wait...</h1>
           <Image src="/page-not-found.png" alt="Wait" width={300} height={300}/>
         </div>
      ):(
        <>
        <div className="grid p-8 2xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 items-center w-full gap-2">
        {Plain_F_Projects.map((completed_P:IProject,index:number)=>(
            <>
            <div key={index} className='w-full flex items-center'>
            <CompletedProject completed_P={completed_P}/>
            </div>
            
            </>
          ))}
          </div>
        </>
      )}
    </div>
  )
}

export default page
