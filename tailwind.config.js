/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx,html,ejs}"],
  theme: {
    extend: {
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
