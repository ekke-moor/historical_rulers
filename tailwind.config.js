/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B4513', // saddle-brown
        'primary-foreground': '#FEFCF8', // warm off-white
        
        // Secondary Colors
        'secondary': '#CD853F', // sandy-brown
        'secondary-foreground': '#2C1810', // deep chocolate brown
        
        // Accent Colors
        'accent': '#DAA520', // goldenrod
        'accent-foreground': '#2C1810', // deep chocolate brown
        
        // Background Colors
        'background': '#FEFCF8', // warm off-white
        'surface': '#F5F2ED', // cream
        
        // Text Colors
        'text-primary': '#2C1810', // deep chocolate brown
        'text-secondary': '#5D4E37', // medium brown
        
        // State Colors
        'success': '#6B8E23', // olive-green
        'success-foreground': '#FEFCF8', // warm off-white
        'warning': '#B8860B', // dark-goldenrod
        'warning-foreground': '#FEFCF8', // warm off-white
        'error': '#A0522D', // sienna
        'error-foreground': '#FEFCF8', // warm off-white
        
        // Border Colors
        'border': '#E6D7C3', // muted earth tone
        'border-light': '#F0E6D6', // lighter earth tone
      },
      fontFamily: {
        'heading': ['Crimson Text', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Libre Baskerville', 'serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'subtle': '4px',
        'card': '8px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(139, 69, 19, 0.1)',
        'medium': '0 4px 12px rgba(139, 69, 19, 0.15)',
        'strong': '0 8px 16px rgba(139, 69, 19, 0.2)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
      },
      zIndex: {
        'navigation': '100',
        'search-overlay': '200',
        'content-overlay': '150',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}