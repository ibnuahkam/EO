'use strict'

class Guest {
  async handle({ auth, response }, next) {
    try {
      // Jika pengguna sudah login, arahkan ke dashboard
      if (auth.user) {
        return response.redirect('/dashboard')
      }
      // Lanjutkan ke middleware berikutnya
      await next()
    } catch (error) {
      // Jika tidak ada pengguna yang login, lanjutkan ke middleware berikutnya
      await next()
    }
  }
}

module.exports = Guest
