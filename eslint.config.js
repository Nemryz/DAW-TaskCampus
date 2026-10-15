import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Esta configuración la trajo la base entregada junto con Vite, y no la escribimos nosotros
// Ignoramos la carpeta de distribución porque ahí solo viven archivos ya compilados
export default defineConfig([
  globalIgnores(['dist']),
  {
    // Revisamos los archivos de JavaScript y los que contienen JSX, que en React son la mayoría
    files: ['**/*.{js,jsx}'],
    extends: [
      // Aplicamos los errores que JavaScript considera graves por defecto en cualquier proyecto
      js.configs.recommended,
      // Verificamos que los hooks se llamen en el nivel superior y que el orden nunca cambie
      reactHooks.configs.flat.recommended,
      // Prohibimos que un archivo exporte dos componentes porque eso rompe la recarga en caliente
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // Declaramos el navegador como entorno porque el código usa document, fetch y el DOM
      globals: globals.browser,
      // Le indicamos al analizador que dentro de los archivos hay marcado que parece HTML
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
