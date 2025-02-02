/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        // Background Colors
        'bg-light': '#f4f4f4', // Light Grey Background

        // Primary and Secondary Colors
        'vibrant-blue': '#007BFF', // Blue for links, buttons, etc.
        'vibrant-teal': '#008080', // Teal (Alternative Primary)

        // Text Colors
        'text-dark': '#333333', // Dark Charcoal for body text
        'text-secondary': '#888888', // Light Grey for secondary text

        // Accent Colors
        'coral': '#FF6F61', // Coral for accent buttons/icons
        'orange': '#FFA500', // Orange for accents

        // Link Colors
        'link-default': '#007BFF', // Default blue link color
        'link-hover': '#0056b3', // Hover color for links (darker blue)
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add the scrollbar plugin
  ],};
