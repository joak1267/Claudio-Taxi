// ✅ CAMBIO: Actualizado para usar el nuevo paquete de Tailwind v4
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Antes decía 'tailwindcss'
    autoprefixer: {},
  },
}