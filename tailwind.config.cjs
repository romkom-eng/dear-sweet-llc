/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#5C2A32",
                secondary: "#B68D40",
                accent: "#B68D40",
                "background-light": "#F6F1E6",
                "background-dark": "#211A16",
                "surface-light": "#FFFFFF",
                "surface-dark": "#2F2521",
                "text-light": "#5b4f45",
                "text-dark": "#F6F1E6",
            },
            fontFamily: {
                display: ["Fraunces", "serif"],
                body: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                'xl': "0.5rem",
                '2xl': "0.625rem",
                '3xl': "0.75rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
