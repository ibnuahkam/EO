'use strict'

class AboutController {
    async index({ view, auth }) {
        return view.render('user.about', { user: auth.user })
      }
}

module.exports = AboutController
