import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Project } from "@/lib/mongodb"
import { NextResponse } from "next/server"

interface projectIdProps{
projectId:string
}

export const PATCH = async (req:Request,{ params }: { params: projectIdProps }) =>{
try {
    const user = await currentUser()
    await ConnectedToDb()
    const {projectId} = params

    const { projectName, projectType , Requirements , Description,fileUrl,Price} = await req.json()
    if(!user){
        return new NextResponse("unAuthorized User",{status:404})
    }

    const UpdateProject = await Project.findOneAndUpdate({_id:projectId},{
        project_title: projectName,
        project_type: projectType,
        project_requirements: Requirements,
        project_description: Description,
        projectFiles:fileUrl,
        price:Price
    },{new:true})

    await UpdateProject.save()

    return new NextResponse(UpdateProject,{status:200})
} catch (error) {
    console.log(error)
    return new NextResponse("INTERNAL SERVER ERROR",{status:500})
}
}