exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.text('name').notNullable();
      table.varchar('email').unique().notNullable();
      table.text('password').notNullable();
      table.text('role').notNullable();
      table.boolean('status').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  