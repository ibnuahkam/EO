'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.get('/', ({ response }) => {
    return response.redirect('/login')
  })
Route.get('/login', 'AuthController.showLogin').middleware(['guest'])
Route.post('/login', 'AuthController.login').middleware(['guest'])
Route.get('/dashboard', 'DashboardController.index').middleware(['auth'])
Route.get('/about', 'AboutController.index').middleware(['auth'])
Route.post('/store-event', 'EventController.store')
Route.get('/event-data', 'EventController.index')
