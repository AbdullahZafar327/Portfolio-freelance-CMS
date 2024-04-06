import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Order, Project, Role } from "@/lib/mongodb"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
interface propsId{
projectId:string,
orderId:string
}

export const DELETE = async (req:NextApiRequest,{params}:{params:propsId})=>{
    await ConnectedToDb()
    try {
        const user = await currentUser()
        const {projectId,orderId} = params
        if(!projectId && orderId){
            return new NextResponse("IDS ARE UNDEFINED",{status:404})
        }

        if(!user){
            return new NextResponse("unAuthorized",{status:404})
        }

        const isAdmin = user.role === Role.Admin

        if(!isAdmin){
            return new NextResponse("unAuthorized",{status:404})
        }

        const project = await Project.findByIdAndDelete({_id:projectId})
        await project.save()
        const order = await Order.findByIdAndDelete({_id:orderId})
        await order.save()

        return new NextResponse("DELETED SUCCESSFULLY",{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("INTERNAL SERVER ERROR",{status:500})
    }
}