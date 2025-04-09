// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Travel Story - Share Your Travel Adventures',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Create, share, and manage your travel adventures with Travel Story. Plan trips, track expenses, and share your journey with friends and family.',
        },
        {
          name: 'keywords',
          content:
            'travel, trip planning, travel sharing, travel management, travel stories, trip organizer',
        },
        { name: 'author', content: 'Travel Story' },
        { name: 'theme-color', content: '#3B82F6' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Travel Story - Share Your Travel Adventures' },
        {
          property: 'og:description',
          content:
            'Create, share, and manage your travel adventures with Travel Story. Plan trips, track expenses, and share your journey with friends and family.',
        },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:url', content: 'https://travelstory.app' },
        { property: 'og:site_name', content: 'Travel Story' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Travel Story - Share Your Travel Adventures' },
        {
          name: 'twitter:description',
          content:
            'Create, share, and manage your travel adventures with Travel Story. Plan trips, track expenses, and share your journey with friends and family.',
        },
        { name: 'twitter:image', content: '/twitter-image.jpg' },

        // iOS
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Travel Story' },

        // Android
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'application-name', content: 'Travel Story' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxt/image',
    'motion-v/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Allow: '/',
        Disallow: ['/admin/', '/api/'],
        Sitemap: 'https://travelstory.app/sitemap.xml',
      },
    ],
    [
      '@nuxtjs/sitemap',
      {
        hostname: 'https://travelstory.app',
        gzip: true,
        exclude: ['/admin/**'],
      },
    ],
  ],

  // Image module configuration
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: 'https://travelstory.app',
      nfcEnabled: true,
    },
  },
})
