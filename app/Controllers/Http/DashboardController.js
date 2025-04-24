'use strict'

class DashboardController {
    async index({ view, auth }) {
        return view.render('user.dashboard', { user: auth.user })
      }
}

module.exports = DashboardController
