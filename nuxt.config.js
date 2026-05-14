export default {
  mode: 'spa',
  target: 'static',

  head: {
    title: 'Portfolio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal Portfolio' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap'
      }
    ]
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api'
  },

  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000'
  },

  build: {
    transpile: [/^element-ui/]
  },

  server: {
    port: process.env.PORT || 3001
  }
}
