'use strict'

class LayananController {
    async index({ view, auth }) {
        return view.render('user.layanan', { user: auth.user })
      }
}

module.exports = LayananController
