import ConnectedToDb from "@/lib/dbConnection";
import { Order, Project } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const { buffer } = require("micro");

export const POST = async (req: Request) => {
  await ConnectedToDb();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    return new NextResponse("Endpoint is not defined", { status: 404 });
  }
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  if (!sig) {
    console.log("no Signature");
    return NextResponse.json("No Signature");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new NextResponse("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object as Stripe.Checkout.Session;
      // @ts-ignore
      const orderId = data?.metadata.orderId ?? null;
      // @ts-ignore
      const projectId = data?.metadata.projectId ?? null;
      const paid = data.payment_status === "paid";

      if (projectId && orderId && paid) {
        await ConnectedToDb();
        const updateOrder = await Order.findByIdAndUpdate(
          {
            _id: orderId,
          },
          {
            paid: true,
          }
        );
        await updateOrder.save();
        const updateProject = await Project.findByIdAndUpdate(
          {
            _id: projectId,
          },
          {
            paid: true,
          }
        );
        await updateProject.save();
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new NextResponse("webhook succeeded", { status: 200 });
};
