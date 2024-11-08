import { NextResponse } from 'next/server';
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const POST = async(req)=>{
  try{
    const { amount } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {enabled: true}
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  }catch(err){
    return NextResponse.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 }
    )
  }
}