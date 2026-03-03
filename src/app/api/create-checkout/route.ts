import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { designId, frameStyle, size, price } = await request.json();

    if (!designId || !frameStyle || !size || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `ArtDrop Print — ${size} ${frameStyle} frame`,
              description: `Custom AI art print, ${size} with ${frameStyle} frame`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/order/${designId}`,
      metadata: {
        designId,
        frameStyle,
        size,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
