import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection"
import { Order, Project } from "@/lib/mongodb"
import { NextResponse } from "next/server"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req:Request) => {
try {
    const user = await currentUser()


    if(!user){
        return new NextResponse("unAuthorized User",{status:404})
    }


    await ConnectedToDb()
    const {projectId} = await req.json()

    if(!projectId){
        return new NextResponse("project Id is not defined",{status:404})
    }

    const projectInfo = await Project.findOne({_id:projectId}).populate("project_user")

    let line_items = []
    let order_items = []

    line_items.push({
        quantity:1,
        price_data:{
            currency:'USD',
            product_data :{
                name:projectInfo.project_title,
            },
            unit_amount:projectInfo.price * 100
        }
       
    })
    order_items.push({
        quantity:1,
        price_data:{
            currency:'USD',
            product_data :{
                name:projectInfo.project_title,
            },
            unit_amount:projectInfo.price
        }
       
    })

   const order = await Order.create({
    order_items,
    Order_user:projectInfo?.project_user?._id,
    Order_project:projectInfo?._id,
    paid:false
   })
 

   const session = await stripe.checkout.sessions.create({
    line_items,
    mode:'payment',
    customer_email:projectInfo.project_user.user_email,
    success_url:process.env.STRIPE_PUBLIC_URL+`/${user.user_id}?success=true`,
    metadata:{
        orderId:order._id.toString(),
        projectId:projectInfo._id.toString()
    }
   })
   
   return new NextResponse(session.url,{status:200})

} catch (error) {
    console.log(error)
    return new NextResponse("Internal server error_payment",{status:500})
}
}