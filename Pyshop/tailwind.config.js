/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'Inter': ['Inter', 'sans-serif'],
                'lilitaOne': ['"Lilita One"',  'sans-serif'],
            }
        },
    },
    plugins: [],
});