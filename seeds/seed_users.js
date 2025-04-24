const bcrypt = require('bcrypt');

const saltRounds = 10; // Jumlah rounds untuk bcrypt

exports.seed = async function(knex) {
  // Hashing password
  const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
  };

  // Password yang ingin di-hash
  const johnPassword = await hashPassword('123456');

  // Insert data ke tabel
  await knex('users').insert([
    { name: 'Ibnu Ahkam', email: 'ibnuahkam08@gmail.com', password: johnPassword, status: 1, role: 'admin' }
  ]);
};
