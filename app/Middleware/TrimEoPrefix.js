'use strict'

class TrimEoPrefix {
  async handle({ request }, next) {
    // Menghapus prefix /eo dari URL
    if (request.url().startsWith('/eo')) {
      request.request.url = request.url().replace(/^\/eo/, '');
    }

    await next();
  }
}

module.exports = TrimEoPrefix