import ProfileSetting from '@/components/dashboard/ProfileSetting'
import Header from '@/components/dashboard/header'
import { currentUser } from '@/lib/current-user'
import React from 'react'

interface pageProps{
  userId:string
}
const page = async ({params}:{params:pageProps}) => {
  const {userId} = params
  if(!userId){
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
