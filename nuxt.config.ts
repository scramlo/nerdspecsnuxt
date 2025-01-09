// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/apollo', '@nuxt/content'],
  compatibilityDate: '2024-12-18',
  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    }
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://gql.hashnode.com/',
        httpLinkOptions: {
          headers: {
            'Authorization': '7a1122e0-214b-4dd5-905e-68b5eab1e487'
          }
        }
      }
    },
  },
  colorMode: {
    preference: 'light', // start on light
  }
})