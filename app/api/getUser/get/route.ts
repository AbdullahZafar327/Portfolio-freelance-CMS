import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { User } from "@/lib/mongodb"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest)=>{
await ConnectedToDb()
try {
    const profile = await currentUser()
    if(!profile){
        return null
    }

    const user = await User.findOne({_id:profile._id})
    return new NextResponse(user,{status:200})
} catch (error) {
    console.log(error)
    return new NextResponse("INTERNAL SERVER ERROR",{status:500})
}
}