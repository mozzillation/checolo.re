const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  pwa: {
      dest: 'public'
  }
})
