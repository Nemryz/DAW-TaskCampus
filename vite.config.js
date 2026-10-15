import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// El primer plugin se encarga de traducir JSX y de recargar la pantalla cuando guardo un archivo
// El segundo activa el compilador de React, que viene activo en la base entregada y optimiza el renderizado solo
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
