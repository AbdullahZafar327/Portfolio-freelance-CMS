import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { User } from "@/lib/mongodb"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"


export const PATCH = async (req:NextRequest)=>{
    await ConnectedToDb()

    try {
        const {name,about,country,phoneNumber,imageUrl} = await req.json()
        const user = await currentUser()

        if(!user){
            return new NextResponse("UnAuthorized user",{status:404})
        }

        const UpdateProfile = await User.findByIdAndUpdate({_id:user._id},{
            user_name:name,
            user_about:about,
            user_country:country,
            user_phoneNumber:`+${phoneNumber}`,
            user_image:imageUrl
        })

        await UpdateProfile.save()

        return new NextResponse(UpdateProfile,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("internal Server Error",{status:500})
    }
}