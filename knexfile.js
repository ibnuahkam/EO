// knexfile.js

module.exports = {
  development: {
    client: 'mysql2', // Gunakan 'mysql2' untuk MySQL
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'event_org',
      charset: 'utf8mb4', // <-- Tambahkan ini
    },
    migrations: {
      directory: './migrations', // Lokasi file migrasi
    },
    seeds: {
      directory: './seeds', // Lokasi file seed
    }
  },

  // Konfigurasi untuk lingkungan lain seperti production dapat ditambahkan di sini
};