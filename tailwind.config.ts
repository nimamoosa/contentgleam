import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultExtendTheme: 'dark',
      defaultTheme: 'dark',
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: '#180828' // or DEFAULT // or 50 to 900 DEFAULT
          }
          // ... rest of the colors
        }
      }
    })
  ]
}
export default config

//  bg-gradient-to-tr from-purple-700/30 via-pink-800/40 to-purple-800/70
