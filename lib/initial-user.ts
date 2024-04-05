import {  currentUser, redirectToSignIn } from "@clerk/nextjs"
import ConnectedToDb from "./dbConnection"
import { Role, User } from "./mongodb"

export const InitialUser = async () =>{
    await ConnectedToDb()
    try {
        const user = await currentUser()
        const AdminEmail = process.env.AdminEmail


        if (!user) {
            redirectToSignIn(); 
            return; 
        }

        const Admin = user.emailAddresses[0].emailAddress === AdminEmail
      
        let profile = await User.findOne({user_id:user.id})
        
        if(profile){
            return profile
        }else{
                profile = await User.create({
                user_id: user.id,
                user_name:`${user.firstName}${user.lastName}`,
                user_email:user.emailAddresses[0].emailAddress,
                role: Admin ? Role.Admin : Role.Guest,
                user_image:user.imageUrl,
            })
            return profile
        }
    } catch (error) {
        console.log("INITIAL USER ERROR",error)
        
    }
}