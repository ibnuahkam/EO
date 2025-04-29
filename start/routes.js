'use strict'

const Route = use('Route')

// Redirect ke halaman login jika belum login
Route.get('/', ({ response }) => {
    return response.redirect('/login')
})

// Halaman login hanya dapat diakses oleh tamu (guest)
Route.get('/login', 'AuthController.showLogin').middleware(['guest'])
Route.post('/login', 'AuthController.login').middleware(['guest']) // Proses login

// Logout, hanya dapat diakses oleh pengguna yang sudah login
Route.post('/logout', 'AuthController.logout')

// Route yang membutuhkan pengguna yang sudah login (auth)
Route.get('/dashboard', 'DashboardController.index').middleware(['auth'])
Route.get('/about', 'AboutController.index').middleware(['auth'])
Route.get('/my_dashboard', 'MyDashboardController.index').middleware(['auth'])
Route.get('/layanan', 'LayananController.index').middleware(['auth'])
Route.get('/kontak', 'KontakController.index').middleware(['auth'])
Route.post('/store-event', 'EventController.store')
Route.get('/event-data', 'EventController.index')