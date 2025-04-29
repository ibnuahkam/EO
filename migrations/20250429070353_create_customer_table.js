exports.up = function(knex) {
    return knex.schema.createTable('customer', function(table) {
      table.increments('id').primary();
      table.integer('user_id').notNullable();
      table.varchar('phone').unique().notNullable();
      table.text('gender').notNullable();
      table.varchar('birth').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customer');
  };
  