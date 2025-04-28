// @type {import('tailwindcss').Config} 
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{jsx,tsx,html}'], // Scan these files for Tailwind classes
    theme: {
      extend: {
        colors: {
          brand: {
            light: '#BFDBFE',
            DEFAULT: '#3B82F6',
            dark: '#1D4ED8',
          },
          success: {
            light: '#D9F99D',
            DEFAULT: '#84CC16',
            dark: '#4D7C0F',
          },
          fail: {
            light: '#FECACA',
            DEFAULT: '#EF4444',
            dark: '#B91C1C',
          },
          warn: {
            light: '#FEF08A',
            DEFAULT: '#EAB308',
            dark: '#92400E',
          },
          info: {
            light: '#A5F3FC',
            DEFAULT: '#06B6D4',
            dark: '#0E7490',
          },
          neutral: {
            light: '#F3F4F6',
            DEFAULT: '#6B7280',
            dark: '#111827',
          },
        },
      },
    },
  };