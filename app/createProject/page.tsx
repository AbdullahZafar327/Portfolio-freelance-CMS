import CreateProject from '@/components/project-modification/create-project'
import { currentUser } from '@/lib/current-user'
import React from 'react'

const Page = async () => {
  const user = await currentUser()

  if(!user){
    return null
  }
  
  return (
    <div>
      <CreateProject Id={JSON.parse(JSON.stringify(user?._id))} />
    </div>
  )
}

export default Page