exports.up = function(knex) {
    return knex.schema.createTable('inquiries', function(table) {
      table.increments('id').primary();
      table.varchar('name').notNullable();
      table.varchar('email').notNullable();
      table.varchar('phone').notNullable();
      table.text('message').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('inquiries');
  };
  