/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#8B3A3A",
                secondary: "#C48A8A",
                accent: "#D4A373",
                "background-light": "#FFF9F5",
                "background-dark": "#2A1F1F",
                "surface-light": "#FFFFFF",
                "surface-dark": "#3B2C2C",
                "text-light": "#4A3B3B",
                "text-dark": "#FFF9F5",
            },
            fontFamily: {
                display: ["Fredoka", "sans-serif"],
                body: ["Nunito", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "1rem",
                'xl': "1.5rem",
                '2xl': "2rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
