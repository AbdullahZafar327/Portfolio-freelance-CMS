import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Project, User, status } from "@/lib/mongodb"
import { NextResponse } from "next/server"




export const POST = async (req:Request) =>{
    try {
        await ConnectedToDb()
        const { projectName, projectType , Requirements , Description,fileUrl,Price} = await req.json()
        const profile = await currentUser()

        if(!profile){
            return new NextResponse("An UnAuthorized user",{status:404})
        }


        const UserFromDatabase = await User.findOne({user_id:profile.user_id})

        const project = await Project.create({
            project_title: projectName,
            project_type: projectType,
            project_requirements: Requirements,
            project_description: Description,
            project_status:status.inQueue,
            projectFiles:fileUrl,
            project_user: profile._id,
            price:Price
        })


        UserFromDatabase?.user_projects.push(project)
        await UserFromDatabase?.save()       

        return new NextResponse(project,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("INTERNAL SERVER ERROR",{status:500})
    }
}

export const GET = async(req:Request)=>{
    await ConnectedToDb()
    try {
        const user = await currentUser()
        if(!user){
            return new NextResponse("unAuthorized User",{status:404})
        }

        const DataBaseUser = await User.findOne({_id:user._id})

        return new NextResponse(DataBaseUser.user_projects,{status:200})
        
    } catch (error) {
        console.log("INTERNAL SERVER GET ERROR",error)
    }
}