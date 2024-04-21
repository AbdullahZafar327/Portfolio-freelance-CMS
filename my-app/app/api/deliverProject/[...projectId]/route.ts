import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Project, Role, status } from "@/lib/mongodb"
import { NextResponse } from "next/server"
interface paramsProps {
    projectId:string
}

export const POST = async (req:Request,{params}:{params:paramsProps}) =>{
await ConnectedToDb()
try {
    const user  = await currentUser()
    const {Files} = await req.json()
    if(!user){
        return new NextResponse("USER NOT FOUND",{status:404})
    }

    const {projectId} = params

    const isAdmin = user.role === Role.Admin

    if(isAdmin){
        const UploadToProject = await Project.findByIdAndUpdate({_id:projectId},{
            FinishedFiles:Files,
            project_status:status.completed
        })

        await UploadToProject.save()

        return NextResponse.json(UploadToProject,{status:200})
    }


} catch (error) {
    console.log(error)
    return new NextResponse("INTERNAL SERVER ERROR",{status:500})
}
}