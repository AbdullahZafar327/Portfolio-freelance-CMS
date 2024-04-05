import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { User } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req:Request) =>{
try {
    await ConnectedToDb()
    const user = await currentUser()

    if(!user){
        return new NextResponse("UnAuthorized User",{status:404})
    }

    const userFromDataBase = await User.findOne({_id:user._id})
    return new NextResponse(userFromDataBase,{status:200})
} catch (error) {
    return new NextResponse("Internal Server Error",{status:500})
}
}