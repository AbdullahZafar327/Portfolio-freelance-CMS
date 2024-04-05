"use client"
import useProjectsStore from '@/lib/projectStore'
import React, { useEffect } from 'react'
import EachOrder from './EachOrder'
import { Order_Project_User } from '@/type'
import { status } from '@/lib/mongodb'

const AllOrders = () => {
    const fetchAllOrders = useProjectsStore((state)=>state.fetchAllOrders)
    const allOrders = useProjectsStore((state)=>state.allOrders)

    useEffect(()=>{
      fetchAllOrders()
    },[])
    

    const Orders = allOrders.filter((order)=>order?.paid === true && order?.Order_project?.project_status !== status.completed)
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-2 w-full flex-wrap">
          {Orders.map((order:Order_Project_User,index)=>(
            <>
            <div key={index} className='col-span-1 '>
                <EachOrder order={order}/>
            </div>
            </>
          ))}
       </div>
      </>
  )
}

export default AllOrders
