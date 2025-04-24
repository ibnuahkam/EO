'use strict'

class Auth {
  async handle ({ auth, response }, next) {
    try {
      await auth.check()
      await next()
    } catch (error) {
      return response.redirect('/login')
    }
  }
}

module.exports = Auth
