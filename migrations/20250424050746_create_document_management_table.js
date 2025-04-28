exports.up = function(knex) {
    return knex.schema.createTable('document_management', function(table) {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.string('event_id').notNullable();
      table.json('images').notNullable();
      table.text('description').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('document_management');
  };