module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      fell: ["Fell", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
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
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "scale-in-up": {
          "0%": {
            opacity: "1",
            transform: "scale(95%,95%)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(100%,100%)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(50px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-out-down": "fade-out-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 1.5s ease-out",
        "fade-in-up-1-5": "fade-in-up 1.5s ease-out",
        "fade-in-up-2": "fade-in-up 2s ease-out",
        "fade-in-up-2-5": "fade-in-up 2.5s ease-out",
        "fade-in-up-image": "scale-in-up 5s ease-in",
        "fade-out-up": "fade-out-up 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
