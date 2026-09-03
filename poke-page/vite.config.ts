import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/front-end-challenge-orbital/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
