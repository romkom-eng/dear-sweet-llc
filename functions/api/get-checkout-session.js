export async function onRequestPost({ request, env }) {
    const stripeSecretKey = env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        return new Response(JSON.stringify({ error: 'Stripe Secret Key not configured.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { session_id } = await request.json();

        if (!session_id) {
            throw new Error('No session ID provided');
        }

        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const session = await response.json();
        if (session.error) {
            throw new Error(session.error.message);
        }

        // Return order ID (payment_intent), email, and calculate an estimated delivery date
        const email = session.customer_details?.email || '';
        const orderId = session.payment_intent || session.id;
        
        // Estimated delivery: roughly 5 days from today
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
        const estimatedDeliveryDateStr = estimatedDelivery.toISOString().split('T')[0];

        // Ensure Stripe was actually able to capture the location and order
        const country = session.customer_details?.address?.country || 'US';

        return new Response(JSON.stringify({ 
            order_id: orderId,
            email: email,
            delivery_country: country,
            estimated_delivery_date: estimatedDeliveryDateStr
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
