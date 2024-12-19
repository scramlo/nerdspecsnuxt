// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/apollo'],
  compatibilityDate: '2024-12-18',
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
})