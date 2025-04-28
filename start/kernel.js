'use strict'

const Server = use('Server')

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'App/Middleware/SessionCheck',
  'Adonis/Middleware/AuthInit',  // Pastikan ini ada
]

const namedMiddleware = {
  auth: 'App/Middleware/Auth',
  guest: 'App/Middleware/Guest',
  auth: 'App/Middleware/SessionCheck',
  layout: 'App/Middleware/LayoutMiddleware'
}

const serverMiddleware = [
  'Adonis/Middleware/Cors',
  'Adonis/Middleware/Static',
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware)
