import Header from '@/components/dashboard/header'
import { RedirectToSignIn } from '@clerk/nextjs'
import React from 'react'
interface pageProps {
  userId:string
}

const page = ({params}:{params:pageProps}) => {
  const {userId} = params
  if(!userId){
    <RedirectToSignIn redirectUrl={"/sign-in"}/>
  }
  return (
    <div>
      <Header title="Payments & Orders"/>
    </div>
  )
}

export default page
