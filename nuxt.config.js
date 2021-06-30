export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'undp-data-gaps',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // CONNECTION WITH STANDALONE VUE DEVTOOLS
      {
        src:
          process.env.NODE_ENV !== 'production' ? 'http://localhost:8098' : '',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/style/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus.js',
    { src: '~/plugins/d3.js', mode: 'client' },
    { src: '~/plugins/goals.js', mode: 'client' },
    { src: '~/plugins/anime.js', mode: 'client' },
    { src: '~/plugins/vue-scrollama.js', mode: 'client' },
    { src: '~/plugins/smoothscroll-polyfill.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['./assets/style/*.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-mq'],

  mq: {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
  },
}
