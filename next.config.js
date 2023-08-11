/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  images: {
    domains: ["127.0.0.1","idrisbookbank-dev-server.inara.tech","s3-inara.eu-central-1.linodeobjects.com"],

  },

  async redirects() {
    return [
      {
        source: '/Category/:slug',
        destination: '/categories/:slug',
        permanent: false,
      },
      {
        source: '/Cat/:slug',
        destination: '/categories/:slug',
        permanent: false,
      },
      // {
      //   source: '/product:slug(\\.html)',
      //   destination: '/',
      //   permanent: true,
      // },
      // {
      //   source: '/items.php*',
      //   destination: '/',
      //   permanent: true,
      // },
      
    ]

  },
};