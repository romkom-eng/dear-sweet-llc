const fetch = require('node-fetch');

(async () => {
    const payload = {
        service_id: 'service_glti2i5',
        template_id: 'template_jfvypru',
        user_id: 'ZKLV3o3AltwRoZ2-_',
        template_params: {
            to_name: "Test",
            to_email: "test@test.com",
            phone: "123",
            product: "test",
            quantity: "15",
            pickup_date: "2025-03-08",
            pickup_time: "12:00",
            message: "test"
        }
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://dear-sweet-llc.pages.dev',
                'Referer': 'https://dear-sweet-llc.pages.dev/',
                'User-Agent': 'Mozilla/5.0'
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', text);
    } catch (err) {
        console.error('Fetch error:', err);
    }
})();
