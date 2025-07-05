import type { RequestHandler } from './$types';

import Stripe from "stripe";
import { auth } from "$lib/server/auth"; 
import { connectToDB } from "$lib/server/db/connect"; // your MongoDB client
import mongoose from "mongoose";
import { PRIVATE_STRIPE_SECRET_KEY } from "$env/static/private";

const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY!);

export const POST:RequestHandler = async (req) => {
  const session = await auth.api.getSession({
      headers:req
  });
  if (!session) return new Response("Unauthorized",{ status: 401 });
    await connectToDB();
  const user = await mongoose.model("User").findOne({ id: session.user.id });

  if (!user?.stripeCustomerId) {
    return new Response("No Stripe customer ID found", { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_123", 
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  return new Response(
    JSON.stringify({ url: checkoutSession.url }),
    { status: 200 }
  );
};
