'use strict'
const User = use('App/Models/User')  // Ganti dengan model User
const Customer = use('App/Models/Customer')
const Hash = use('Hash')

class RegisterController {
  async index ({ view }) {
    return view.render('user.register')
  }

  async store ({ request, response }) {
    const { name, email, password, phone, gender, birth } = request.only([
      'name', 'email', 'password', 'phone', 'gender', 'birth'
    ])

    // Simpan data di tabel users
    const user = await User.create({
      name,
      email,
      password: await Hash.make(password),
      role: 'user',  // hardcoded user
      status: 1
    })

    // Simpan data di tabel customer
    await Customer.create({
      user_id: user.id,  // Gunakan user.id setelah user berhasil dibuat
      phone,
      gender,
      birth
    })

    return response.redirect('/')  // Redirect ke halaman login setelah registrasi berhasil
  }
}

module.exports = RegisterController