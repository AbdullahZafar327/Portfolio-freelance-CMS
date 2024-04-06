import ManageProjects from '@/components/projectCards/ManageProjects'
import React from 'react'

interface pageProps {
  UserId:string
}
const page = ({params}:{params:pageProps}) => {
  const {UserId} = params
  if(!UserId){
    return null
  }
  
  return (
    <div>
      <ManageProjects/>
    </div>
  )
}

export default page
