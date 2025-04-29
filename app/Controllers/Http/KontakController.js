'use strict'

class KontakController {
    async index({ view, auth }) {
        return view.render('user.kontak', { user: auth.user })
      }
}

module.exports = KontakController
