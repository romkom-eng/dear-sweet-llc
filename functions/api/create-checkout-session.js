export async function onRequestPost({ request, env }) {
    const stripeSecretKey = env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        return new Response(JSON.stringify({ error: 'Stripe Secret Key not configured.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { items, deliveryMethod, shippingFee, metadata } = await request.json();

        // Line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.product.title} (${item.variant.label})`,
                    images: [new URL(item.product.image, request.url).toString()],
                },
                unit_amount: Math.round(item.variant.price * 100), // Stripe in cents
            },
            quantity: item.quantity,
        }));

        // Add shipping as a line item if applicable
        if (deliveryMethod === 'shipping' && shippingFee > 0) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Next Day Air Shipping',
                    },
                    unit_amount: Math.round(shippingFee * 100),
                },
                quantity: 1,
            });
        }

        const body = new URLSearchParams({
            'payment_method_types[]': 'card',
            'mode': 'payment',
            'success_url': `${new URL(request.url).origin}/?success=true`,
            'cancel_url': `${new URL(request.url).origin}/?canceled=true`,
            'billing_address_collection': 'auto', // 'required' 도 가능
        });

        // 배송(Shipping) 선택 시 주소 입력 칸 활성화
        if (deliveryMethod === 'shipping') {
            body.append('shipping_address_collection[allowed_countries][0]', 'US');
        }

        // Add metadata
        if (metadata) {
            Object.keys(metadata).forEach(key => {
                body.append(`metadata[${key}]`, metadata[key]);
            });

            // 이메일 알림에 픽업 정보가 잘 보이도록 결제 설명문(Description)에 추가
            const description = `Pickup: ${metadata.pickup_date} at ${metadata.pickup_time}. Notes: ${metadata.customer_notes}`;
            body.append('payment_intent_data[description]', description);
        }

        line_items.forEach((item, index) => {
            body.append(`line_items[${index}][price_data][currency]`, item.price_data.currency);
            body.append(`line_items[${index}][price_data][unit_amount]`, item.price_data.unit_amount);
            body.append(`line_items[${index}][price_data][product_data][name]`, item.price_data.product_data.name);
            if (item.price_data.product_data.images) {
                body.append(`line_items[${index}][price_data][product_data][images][0]`, item.price_data.product_data.images[0]);
            }
            body.append(`line_items[${index}][quantity]`, item.quantity);
        });

        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const session = await response.json();
        if (session.error) {
            throw new Error(session.error.message);
        }

        return new Response(JSON.stringify({ url: session.url }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
