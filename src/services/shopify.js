import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'moodpop-3.myshopify.com',
    storefrontAccessToken: '2fc101dc4fa1a55815fb33233905dde6',
});

export default client;
