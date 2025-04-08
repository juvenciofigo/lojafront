module.exports = {
    content: [
      "./pages/**/*.{js,jsx,vue}",
      "./components/**/*.{js,jsx,vue}",
      "./app/**/*.{js,jsx,vue}",
      "./src/**/*.{js,jsx,vue}",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./public/**/*.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FF5733',
          secondary: '#33FF57'
        },
        spacing: {
          128: '32rem'
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography')
    ]
  }
  