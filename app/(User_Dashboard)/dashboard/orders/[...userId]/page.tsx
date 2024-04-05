import AllOrders from '@/components/Admin-CMS/AllOrders'
import Header from '@/components/dashboard/header'
import React from 'react'

const page = () => {
    
  return (
    <div>
      <Header title="Manage Orders"/>
      <AllOrders/>
    </div>
  )
}

export default page
