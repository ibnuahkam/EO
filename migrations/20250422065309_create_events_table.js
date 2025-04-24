exports.up = function(knex) {
    return knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.integer('user_id').notNullable();
      table.varchar('title').unique().notNullable();
      table.text('description').notNullable();
      table.text('location').notNullable();
      table.text('date').notNullable();
      table.integer('status').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events');
  };
  