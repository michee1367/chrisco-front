export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chrisco-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vee-validate.js',
    },
    {
      src: '~/plugins/toast.js',
    },
    {
      src: '~/plugins/whttp.js',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  serverMiddleware: [
    { path: "/api", handler: "~/server-middleware/api.js" },
  ],
  env: {
    baadhiTeamsBaseUrl: process.env.BAADHI_TEAMS_BASE_URL,
    baadhiTeamsPathAttName: process.env.BAADHI_TEAMS_PATH_ATT_NAME,
    baadhiTeamsLogoutPath: process.env.BAADHI_TEAMS_LOGOUT_PATH,
    endPoint:process.env.END_POINT,
  }
}
