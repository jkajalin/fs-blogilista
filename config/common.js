/**
 * Insert application wide common items here, they're all exported by frontend and backend common.js respectively
 */

const inProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8000

module.exports = {
  inProduction, PORT
}
