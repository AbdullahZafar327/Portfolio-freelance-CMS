import CreateProject from '@/components/create-project'
import { currentUser } from '@/lib/current-user'
import React from 'react'

const Page = async () => {
  const user = await currentUser()
  
  return (
    <div>
      <CreateProject Id={JSON.parse(JSON.stringify(user._id))} />
    </div>
  )
}

export default Page