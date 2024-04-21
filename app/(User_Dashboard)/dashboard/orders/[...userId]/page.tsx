import AllOrders from '@/components/Admin-CMS/AllOrders'
import Header from '@/components/dashboard/header'
import React from 'react'

interface pageProps {
  userId:string
}
const page = ({params}:{params:pageProps}) => {

  const {userId} = params
  if(!userId){
    return null
  }
    
  return (
    <div>
      <Header title="Manage Orders"/>
      <AllOrders/>
    </div>
  )
}

export default page
