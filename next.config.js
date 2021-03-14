module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://shop.magnum.com.ua/api/:path*' // Proxy to Backend
      },
      {
        source: '/uploads/:path*',
        destination: 'http://shop.magnum.com.ua/uploads/:path*' // Proxy to Backend
      }
    ]
  }
}
