'use strict';

class Cors {
  async handle({ request, response }, next) {
    // Menambahkan log untuk debugging
    console.log('CORS middleware activated');

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (request.method() === 'OPTIONS') {
      // Jika ini adalah preflight request
      console.log('OPTIONS request detected, sending response');
      return response.status(200).send('');
    }

    await next(); // Lanjutkan ke middleware berikutnya
  }
}

module.exports = Cors;
