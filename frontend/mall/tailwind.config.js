const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', '"Hiragino Sans"', '"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        ibm: {
          blue: '#d4788a',
          'blue-hover': '#c06578',
          'blue-60': '#ac5268',
          'blue-80': '#884058',
          ink: '#3a2018',
          'ink-muted': '#7a5840',
          'ink-subtle': '#b09278',
          canvas: '#fffef9',
          'surface-1': '#fef3c7',
          'surface-2': '#fde8a0',
          'surface-3': '#6b5040',
          'surface-4': '#fff8e8',
          hairline: '#f0ddd0',
          'hairline-strong': '#3a2018',
          'inverse-canvas': '#4a2818',
          'inverse-surface-1': '#5d3828',
          'inverse-ink': '#fff8f0',
          'inverse-ink-muted': '#d4b8a8',
          success: '#5a9a60',
          warning: '#d4a020',
          error: '#c85070',
          'error-hover': '#a84060',
        },
      },
      letterSpacing: {
        carbon: '0.02em',
        'carbon-caption': '0.04em',
        'carbon-display': '-0.02em',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        'html, body': {
          fontFamily: theme('fontFamily.sans'),
          backgroundColor: theme('colors.ibm.canvas'),
          color: theme('colors.ibm.ink'),
          letterSpacing: '0.02em',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        'input, button, select, textarea': {
          fontFamily: 'inherit',
        },
      })

      addUtilities({
        '.ibm-rounded-sm': { borderRadius: '8px' },
        '.ibm-rounded-md': { borderRadius: '16px' },
        '.ibm-rounded-lg': { borderRadius: '24px' },
        '.ibm-rounded-full': { borderRadius: '9999px' },
      })

      addComponents({
        '.ibm-dxl-76': {
          fontSize: '72px',
          fontWeight: '300',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        },
        '.ibm-dlg-60': {
          fontSize: '56px',
          fontWeight: '300',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        },
        '.ibm-dmd-42': {
          fontSize: '40px',
          fontWeight: '300',
          lineHeight: '1.25',
        },
        '.ibm-h-32': {
          fontSize: '30px',
          fontWeight: '400',
          lineHeight: '1.35',
        },
        '.ibm-ct-24': {
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '1.45',
        },
        '.ibm-sh-20': {
          fontSize: '19px',
          fontWeight: '400',
          lineHeight: '1.5',
        },
        '.ibm-blg-18': {
          fontSize: '17px',
          fontWeight: '400',
          lineHeight: '1.75',
        },
        '.ibm-b-16': {
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: '1.7',
          letterSpacing: '0.02em',
        },
        '.ibm-bsm-14': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
        },
        '.ibm-be-14': {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
        },
        '.ibm-c-12': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '1.5',
          letterSpacing: '0.04em',
        },
        '.ibm-e-14': {
          fontSize: '13px',
          fontWeight: '400',
          lineHeight: '1.6',
          letterSpacing: '0.04em',
          color: theme('colors.ibm.ink-muted'),
        },

        '.ibm-btn': {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '1.4',
          letterSpacing: '0.06em',
          padding: '10px 28px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          minHeight: '42px',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: '1.5px solid transparent',
          borderRadius: '9999px',
        },
        '.ibm-btn-primary': {
          backgroundColor: theme('colors.ibm.blue'),
          color: '#ffffff',
          boxShadow: '0 2px 8px rgba(212,120,138,0.30)',
          '&:hover': {
            backgroundColor: theme('colors.ibm.blue-hover'),
            boxShadow: '0 4px 14px rgba(212,120,138,0.40)',
            transform: 'translateY(-1px)',
          },
          '&:active': { backgroundColor: theme('colors.ibm.blue-80'), transform: 'none' },
        },
        '.ibm-btn-secondary': {
          backgroundColor: theme('colors.ibm.surface-3'),
          color: '#ffffff',
          '&:hover': { backgroundColor: theme('colors.ibm.ink'), transform: 'translateY(-1px)' },
        },
        '.ibm-btn-tertiary': {
          backgroundColor: 'transparent',
          color: theme('colors.ibm.blue'),
          borderColor: theme('colors.ibm.blue'),
          '&:hover': {
            backgroundColor: theme('colors.ibm.blue'),
            color: '#ffffff',
            transform: 'translateY(-1px)',
          },
        },
        '.ibm-btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.ibm.blue'),
          '&:hover': { backgroundColor: theme('colors.ibm.surface-1') },
        },
        '.ibm-btn-danger': {
          backgroundColor: theme('colors.ibm.error'),
          color: '#ffffff',
          borderRadius: '9999px',
          '&:hover': { backgroundColor: theme('colors.ibm.error-hover') },
        },

        '.ibm-input': {
          backgroundColor: '#ffffff',
          color: theme('colors.ibm.ink'),
          fontSize: '15px',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
          padding: '10px 16px',
          border: `1.5px solid ${theme('colors.ibm.hairline')}`,
          borderRadius: '12px',
          width: '100%',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.ibm.blue'),
            boxShadow: `0 0 0 3px rgba(212,120,138,0.18)`,
          },
        },

        '.ibm-card': {
          backgroundColor: '#ffffff',
          border: `1px solid ${theme('colors.ibm.hairline')}`,
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(58,32,24,0.06)',
        },
        '.ibm-card-elevated': {
          backgroundColor: theme('colors.ibm.surface-1'),
          border: `1px solid ${theme('colors.ibm.hairline')}`,
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(58,32,24,0.10)',
        },
      })
    }),
  ],
}
