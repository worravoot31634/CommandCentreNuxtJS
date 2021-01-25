import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Command Centre',
    title: 'Home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)

  css: [
    '~/assets/fonts/prompt.css',
    '~/assets/css/styles.css',
    'vue-select-image/dist/vue-select-image.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/googleMap', ssr: true },
    '~/plugins/vuesax',
    { src: '~/plugins/selectImage', mode: 'client' },
    '~/plugins/location-picker',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/proxy',
    'nuxt-webfontloader',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyBADAqriUhPKXXmSfcgpNNMuG_Mhwf1DKc',
        //you can use libraries: ['places']
      },
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCmO9IY1MVJcYa0KdlwBJgA9OAOFnGqpjM',
          authDomain: 'eletor-e20d1.firebaseapp.com',
          databaseURL: 'https://eletor-e20d1-default-rtdb.firebaseio.com',
          projectId: 'eletor-e20d1',
          storageBucket: 'eletor-e20d1.appspot.com',
          messagingSenderId: '947968230344',
          appId: '1:947968230344:web:39447939b86b97be16f6fd',
          measurementId: 'G-LG35PVXDE3',
        },
        services: {
          storage: true,
          firestore: true,
        },
      },
    ],
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },
  webfontloader: {
    google: {
      families: ['Prompt:400,500,700,900'],
    },
  },
  styleResources: {
    scss: './scss/*.scss',
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: 'http://it1.sut.ac.th:9026',
  },

  proxy: {
    '/eletor/api/': {
      target: 'http://it1.sut.ac.th:9026/eletor/api',
      pathRewrite: {
        '^/eletor/api/': '',
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: false,
    },
    theme: {
      font: {
        family: 'Prompt',
      },
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#68783c',
        },
        light: {
          background: '#68783c',
        },
      },
    },
  },
  publicRuntimeConfig: {
    baseURL: 'http://it1.sut.ac.th:9026',
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^vue2-google-maps($|\/)/, 'vue2-location-picker'],
  },
}
