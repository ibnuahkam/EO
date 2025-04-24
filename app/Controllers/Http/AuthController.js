'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database');

class AuthController {
    async showLogin({ view, auth, response }) {
        if (auth.user) {
            return response.redirect('/dashboard')
        }
        return view.render('user.login')
    }

    async login({ request, auth, response }) {
        const { email, password } = request.only(['email', 'password'])
    
        try {
          const user = await User.query().where('email', email).firstOrFail()
    
          if (!(await Hash.verify(password, user.password))) {
            return response.badRequest('Invalid credentials')
          }
    
          await auth.login(user)
          return response.redirect('/dashboard')
        } catch (error) {
          console.error(error)
          return response.badRequest('Invalid credentials')
        }
      }
}

module.exports = AuthController
