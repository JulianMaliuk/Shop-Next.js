const BASE_URL = 'http://shop.magnum.com.ua'
// const BASE_URL = 'http://localhost:9044'

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BASE_URL}/api/:path*` // Proxy to Backend
      },
      {
        source: '/uploads/:path*',
        destination: `${BASE_URL}/uploads/:path*` // Proxy to Backend
      }
    ]
  }
}
