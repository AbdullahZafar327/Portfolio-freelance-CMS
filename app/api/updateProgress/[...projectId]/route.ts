import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Project } from "@/lib/mongodb"
import { NextResponse } from "next/server"

interface projectIdProps{
    projectId:string
}

export const PATCH = async (req:Request,{params}:{params:projectIdProps}) => {
await ConnectedToDb()

try {
    const user = await currentUser()
    const  {project_progress} = await req.json()

    if(!user){
        return new NextResponse("UnAuthorized User",{status:404})
    }

    const { projectId } = params;

    const admin = process.env.AdminEmail
    const isAdmin = user.user_email === admin

    if(!isAdmin){
        return new NextResponse("You do not have permissions",{status:403})
    }

    if(!projectId){
        return new NextResponse("ProjectId not found",{status:404})
    }


        const projectToUpdate = await Project.findOneAndUpdate({
            _id:projectId
        },{
            project_progress:project_progress
        },{
            new:true
        })

        await projectToUpdate.save()
        
        return new NextResponse(projectToUpdate,{status:200})
    
} catch (error) { 
       console.log(error)
       return new NextResponse("INTERNAL SERVER ERROR",{status:500})
}
}