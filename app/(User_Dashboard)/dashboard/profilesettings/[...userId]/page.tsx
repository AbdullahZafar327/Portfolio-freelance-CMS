import ProfileSetting from '@/components/dashboard/ProfileSetting'
import Header from '@/components/dashboard/header'
import { currentUser } from '@/lib/current-user'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  const plainUser = JSON.parse(JSON.stringify(user))

  if(!user){
    return null
  }

  return (
    <div>
      <Header title="Profile Settings"/>
      <ProfileSetting/>
    </div>
  )
}

export default page
