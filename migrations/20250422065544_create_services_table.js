exports.up = function(knex) {
    return knex.schema.createTable('services', function(table) {
      table.increments('id').primary();
      table.varchar('name').notNullable();
      table.text('description').notNullable();
      table.decimal('price').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('services');
  };
  