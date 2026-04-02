// ─── Dear Sweet LLC — Static Product Catalog ───────────────────────────────
// To add/edit products, update this file.
// stripeLink: paste your Stripe Payment Link URL here when ready.
// ────────────────────────────────────────────────────────────────────────────

export const PRODUCTS = [
    {
        id: 'mm-chocolate-bagel',
        title: 'M&M Chocolate Bagel',
        subtitle: 'Melted M&Ms Inside',
        price: 4.50,
        description:
            'A rich, soft chocolate bagel with colorful M&M candies baked right inside. Each bite is loaded with gooey, melted chocolate from the M&Ms, creating an indulgent treat that\'s sweet, chewy, and completely irresistible. A fan-favorite for chocolate lovers of all ages.',
        tags: ['Chocolate', 'M&M', 'Bagel'],
        image: '/bagel_chocolate_mm.png',
        variants: [
            { id: 'bagel-1', label: '1 Bagel', price: 4.50 },
            { id: 'bagel-6', label: '6-Pack Box', price: 24.99 },
        ],
    },
    {
        id: 'original-dubai-chewy',
        title: 'Original Dubai Chewy Cookie',
        subtitle: 'The Classic',
        price: 7.00,
        description:
            'The cookie that started it all. Premium kataifi (kunafa) pastry layered with authentic Dubai chocolate and Callebaut milk chocolate, all wrapped in a golden, chewy shell. Every bite melts into a rich, nutty sweetness you can\'t find anywhere else.',
        tags: ['Best Seller', 'Original', 'Milk Chocolate'],
        image: '/cookie_original_final.png',
        variants: [
            { id: 'original-1', label: '1 Cookie', price: 7.00 },
            { id: 'original-6', label: '6-Pack Box', price: 39.99 },
            { id: 'original-12', label: '12-Pack Box', price: 74.99 },
        ],
    },
    {
        id: 'strawberry-dubai-chewy',
        title: 'Strawberry Dubai Chewy Cookie',
        subtitle: 'Fan Favorite',
        price: 8.00,
        description:
            'A sweet twist on the original. Fresh strawberry cream layered with our signature kunafa pastry and white chocolate, wrapped in a chewy golden shell. Fruity, rich, and completely irresistible.',
        tags: ['Fan Favorite', 'Strawberry', 'White Chocolate'],
        image: '/cookie_strawberry_final.png',
        variants: [
            { id: 'strawberry-1', label: '1 Cookie', price: 8.00 },
            { id: 'strawberry-6', label: '6-Pack Box', price: 44.99 },
            { id: 'strawberry-12', label: '12-Pack Box', price: 84.99 },
        ],
    },
];

export const getProductById = (id) => PRODUCTS.find(p => p.id === id);
