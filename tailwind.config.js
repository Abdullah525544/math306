/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          darkest: '#090D16',
          dark: '#0F172A',
          card: '#151F32',
          surface: '#1E293B',
          subtle: '#26344E',
        },
        brand: {
          mint: '#2DD4BF',
          mintHover: '#14B8A6',
          mintLight: '#99F6E4',
          indigo: '#818CF8',
          indigoHover: '#6366F1',
          violet: '#A78BFA',
          sky: '#38BDF8',
          amber: '#FBBF24',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(129, 140, 248, 0.08) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
