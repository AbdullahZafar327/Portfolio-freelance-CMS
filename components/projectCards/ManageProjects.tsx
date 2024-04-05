"use client"
import React, { useEffect } from 'react'
import Header from '../dashboard/header';
import useProjectsStore from '@/lib/projectStore';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ProjectEditCard from './ProjectEditCard';
import { IProject } from '@/lib/mongodb';

const ManageProjects = () => {
    const {projects,fetchProjects} = useProjectsStore()
    
    useEffect(()=>{
        fetchProjects()
    },[])
  
    return (
      <>
      <div className="overflow-y-auto p-4 md:h-full w-full  ">
        <Header title="Manage Projects"/>
        <div className="w-full flex items-center justify-end pl-8 font-poppins">
              <Link
                href="/createProject"
                className="flex font-poppins  items-center justify-center gap-2 text-white bg-gradient-to-r cursor-pointer from-purple-500 to-violet-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-violet-500/50 dark:shadow-lg dark:shadow-violet-800/80 font-medium rounded-lg text-sm px-4 py-4 text-center me-2 mb-2"
              >
                New Project <Plus />
              </Link>
            </div>
        <div className="grid p-8 md:grid-cols-3 grid-cols-1 items-center w-full gap-2">
           {projects?.map((project:IProject,idx:number)=>(
            <div key={idx} className='w-full flex items-center'>
              <ProjectEditCard project={project}/>
            </div>
           ))}
        </div>
      </div>
      </>
    )
}

export default ManageProjects
