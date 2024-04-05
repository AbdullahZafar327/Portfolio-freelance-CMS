import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Order, Role } from "@/lib/mongodb"
import { redirectToSignIn } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async (req:Request)=> {
await ConnectedToDb()
try {
    const user = await currentUser()
    if(!user){
        redirectToSignIn()
    }

    const admin = user.role === Role.Admin

    if(!admin){
        return new NextResponse("wrong user",{status:403})
    }

    if(admin){
        const Orders = await Order.find({paid:true}).populate("Order_project").populate("Order_user")

        return NextResponse.json(Orders,{status:200})
    }


} catch (error) {
    console.log("Orders GET ERROR",error)
    return new NextResponse("internal server error",{status:500})
}
}