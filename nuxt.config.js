export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,
    server: {
        port: 3002 // default: localhost
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'adminka',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['~/assets/css/main.css'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/axios'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    bootstrapVue: {
        icons: true
    },
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseUrl: 'http://localhost:8000/',
        browserBaseURL: 'http://localhost:8000/',

        // proxy: true // Can be also an object with default options
    },

    // proxy: {
    //     '/api/': { target: 'http://localhost:8000', pathRewrite: { '^/api/': '' } }
    // },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

}