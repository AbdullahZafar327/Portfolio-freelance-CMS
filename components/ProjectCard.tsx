
import { IProject, Role, User } from '@/lib/mongodb'
import React from 'react'
import {MoreVerticalIcon} from 'lucide-react'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import ProfileAvatar from './ProfileAvatar'
import { currentUser } from '@/lib/current-user'



const ProjectCard = async ({project}:{project:IProject}) => {
  const { project_title,project_type,project_description,createdAt,project_progress} = project
  const Admin = await User.findOne({role:Role.Admin})
  const user = await currentUser()

  return (
    <div className="flex flex-col p-2 mt-4 bg-[#65E4A3] rounded-3xl">
      <div className="flex flex-col p-2">

          <div className="flex items-start justify-between">
               <p className="font-semibold text-lg">
                {createdAt?.toISOString().split('T')[0]}
               </p>
               <span>
               <MoreVerticalIcon className="bg-none hover:bg-white/50 rounded-full cursor-pointer"/>
               </span>
          </div>

          <div className="flex items-center justify-center p-8">
            <p className='font-bold text-3xl text-center'>
            {project_type}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start">
           <p className="font-semibold text-lg">
            Progress
           </p>
           <Progress value={project_progress} />
           <div className='flex flex-row-reverse items-end w-full'>
           <span className="font-semibold ">{project_progress.toString()}%</span>
           </div>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <Separator />
            <div className="flex items-center gap-2">
            <ProfileAvatar imageSrc={user?.user_image}/>
            <p>
              {Admin.user_name} is working on your project. Stay tunned!😊
            </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProjectCard
