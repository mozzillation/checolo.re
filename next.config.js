const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  webpack:  (config, { isServer }) => {
    if (isServer) {
      require('./utils/generate-sitemap.js');
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  pwa: {
    disable: prod ? false : true,
    dest: 'public'
  }
})



webpack: (config, { isServer }) => {
  return config;
}
