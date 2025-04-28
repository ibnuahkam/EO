'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')

class AuthController {
    // Menampilkan halaman login
    async showLogin({ view, auth, response }) {
        // Cek jika pengguna sudah login, arahkan ke dashboard
        if (auth.user) {
            return response.redirect('/dashboard')
        }
        return view.render('user.login')
    }

    // Login pengguna
    async login({ request, auth, response }) {
        const { email, password } = request.only(['email', 'password'])
    
        try {
            const user = await User.query().where('email', email).firstOrFail()

            // Verifikasi password
            if (!(await Hash.verify(password, user.password))) {
                return response.badRequest('Invalid credentials')
            }
    
            // Login pengguna dan simpan sesi
            await auth.login(user)
            return response.redirect('/dashboard')
        } catch (error) {
            console.error(error)
            return response.badRequest('Invalid credentials')
        }
    }

    // Logout pengguna
    async logout({ auth, response }) {
        // Logout pengguna dan hapus sesi
        await auth.logout()
        response.clearCookie('adonis.sid') // Clear session cookie manually
        return response.redirect('/login') // Arahkan ke halaman login
    }
}

module.exports = AuthController