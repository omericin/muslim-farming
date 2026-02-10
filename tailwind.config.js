/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#4A9084',
                secondary: '#D4AF37',
                background: '#F8F9FA',
                card: '#367c70',
            },
            fontFamily: {
                serif: ['serif'],
            }
        },
    },
    plugins: [],
}
