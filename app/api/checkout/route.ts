import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body as {
      items: { id: string; name: string; price_sek: number; quantity: number }[];
      customer: { name: string; email: string };
    };

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const amount = items.reduce(
      (sum, item) => sum + item.price_sek * item.quantity,
      0
    );

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amount * 100, // Stripe expects öre
      currency: "sek",
      metadata: {
        customer_name: customer.name,
        customer_email: customer.email,
        items: JSON.stringify(items.map((i) => `${i.name} x${i.quantity}`)),
      },
      receipt_email: customer.email,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
