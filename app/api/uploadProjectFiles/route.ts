import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"


export const POST = async(req:Request)=>{
    await ConnectedToDb()

    try {
        const user = await currentUser()
        const data = await req.formData()
        const files:File | null = data.get("Files") as unknown as typeof files

        if(!files){
         return new NextResponse("Files are not defined",{status:404})
        }

        const bytes = await files.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join("/","tmp",files.name)
        await writeFile(path,buffer)
        console.log(`open ${path} to see the uploaded files`)

    } catch (error) {
        console.log(error)
        return new NextResponse("internal server Error")
    }
}