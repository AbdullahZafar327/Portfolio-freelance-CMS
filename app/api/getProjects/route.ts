import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { User } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req:Request) =>{
    await ConnectedToDb()
    try {
        const user = await currentUser()

        if(!user){
            return new NextResponse("AN Authorized user",{status:404})
        }

        const DataBaseUser = await User.findOne({_id:user?._id}).populate("user_projects")
        const projects = DataBaseUser.user_projects

        return new NextResponse(projects,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("internal server error",{status:500})
    }
}