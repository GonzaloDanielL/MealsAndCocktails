/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'itim': ['Itim', 'cursive']
      },

      keyframes: {
        fondomeals: {
          '0%': { transform: 'translatex(-100%)' },
          '25%': { transform: 'translatex(-200%)' },
          '50%': { transform: 'rotatex(-100%)' },
          '75%': { transform: 'translatex(0%)' },
          '100%': { transform: 'translatex(-100%)' }
        },

        fondodrinks: {
          '0%': { transform: 'translatex(-100%)' },
          '25%': { transform: 'translatex(0%)' },
          '50%': { transform: 'rotatex(-100%)' },
          '75%': { transform: 'translatex(-200%)' },
          '100%': { transform: 'translatex(-100%)' }
        }
      },


      animation: {
        fondomeals: 'fondomeals 420s ease infinite',
        fondodrinks: 'fondodrinks 420s ease infinite'
      }
    },
  },
  plugins: [],
}

