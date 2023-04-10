import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { COLORS } from './src/constants'

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
      ],
      rules: [
        ['date-container-shadow', { 'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px' }],
        ['calendar-text-color', { color: 'rgba(0, 0, 0, 0.87)' }],
        ['calendar-button', { transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }],
        ['calendar-button-hover', { 'background-color': 'rgba(0, 0, 0, 0.04)' }],
        ['calendar-week-color', { color: 'rgba(0, 0, 0, 0.6)' }],
        ['triangle-down', {
          width: '0',
          height: '0',
          'margin-left': '2px',
          'border-left': '5px solid transparent',
          'border-right': '5px solid transparent',
          'border-top': '5px solid rgba(0, 0, 0, 0.54)',
        }],
        ['year-font', { 'font-family': "'Roboto', 'Helvetica', 'Arial', 'sans-serif'" }],
        ['bg-day-hover', { background: 'rgba(25, 118, 210, 0.04)' }],
        ['current-day-border', { border: '1px solid rgba(0, 0, 0, 0.6)' }],
      ],
      safelist: [...COLORS.flatMap((color) => [`bg-${color}`, `hover:bg-${color}-600`])],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    force: true,
  },
  server: {
    port: 4000,
  },
})
