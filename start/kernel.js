'use strict'

const Server = use('Server')

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'App/Middleware/TrimEoPrefix',
  'Adonis/Middleware/AuthInit',  // Pastikan ini ada
]

const namedMiddleware = {
  auth: 'App/Middleware/Auth',
  guest: 'App/Middleware/Guest',
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
