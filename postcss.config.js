export default {
  plugins: {
    // Compiles the nested CSS in src/dashboard/dashboard.css (must run before tailwindcss)
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
