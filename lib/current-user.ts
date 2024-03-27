import { auth, redirectToSignIn } from "@clerk/nextjs"
import ConnectedToDb from "./dbConnection"
import { User } from "./mongodb"



export const currentUser = async ()=>{
 try {
    const { userId } = auth()
    await ConnectedToDb()
    if(!userId){
        return null
    }
   
    const profile = await User.findOne({user_id:userId})

    return profile
 } catch (error) {
    console.log("Current_Profile_error",error)
 }
}