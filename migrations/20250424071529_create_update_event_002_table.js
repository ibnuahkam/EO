exports.up = function(knex) {
    return knex.schema.table('events', function(table) {
      table.string('no_ticket', 255).alter();  // Mengubah tipe kolom menjadi VARCHAR(255)
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('events', function(table) {
      table.integer('no_ticket').alter();  // Mengubah tipe kolom kembali ke integer jika rollback
    });
  };