import ManageProjects from '@/components/projectCards/ManageProjects'
import { RedirectToSignIn, currentUser } from '@clerk/nextjs'
import React from 'react'

interface pageProps {
  UserId:string
}
const page = async ({params}:{params:pageProps}) => {
  const user = await currentUser()
  if(!user){
    return <RedirectToSignIn redirectUrl={"/sign-in"}/>
  }
  
  return (
    <div>
      <ManageProjects/>
    </div>
  )
}

export default page
