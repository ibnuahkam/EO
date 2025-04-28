'use strict'

class SessionCheck {
  async handle ({ request, response, auth }, next) {
    try {
      // Memeriksa apakah pengguna sudah terautentikasi
      await auth.check()
      
      // Lanjutkan ke request berikutnya
      await next()
    } catch (error) {
      // Jika sesi habis, arahkan ke halaman login
      return response.redirect('/login')
    }
  }
}

module.exports = SessionCheck