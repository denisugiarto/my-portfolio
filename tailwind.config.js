module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      body: ["Raleway", "sans-serif"],
      title: ["Suez One", "sans-serif"],
      sans: ["sans-serif", "system-ui", "-apple-system"],
    },
    scrollBehavior: "smooth",
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#4762E5",
      secondary: "#F2F4FF",
      ternary: "#4BD6F2",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#4762E5",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#4762E5",
      secondary: "#F2F4FF",
    }),
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.7s ease-out",
      },
    },
  },
  variants: {
    scrollSnapType: ["responsive"],
    extend: {},
  },
  plugins: [require("tailwindcss-scroll-snap")],
};
