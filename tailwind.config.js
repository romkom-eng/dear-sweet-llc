/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF4D8D',
                'primary-hover': '#FF75A8',
                secondary: '#6366F1',
                accent: '#F43F5E',
                background: '#0B0E14',
                surface: '#161B22',
                'surface-hover': '#21262D',
                'text-primary': '#F0F6FC',
                'text-secondary': '#8B949E',
            },
            backgroundImage: {
                'gradient-premium': 'radial-gradient(circle at top right, rgba(255, 77, 141, 0.1), transparent), radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.1), transparent), #0B0E14',
            },
        },
    },
    plugins: [],
}
