exports.up = async function(knex) {
    await knex.raw('ALTER TABLE events CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    
    return knex.schema.alterTable('events', function(table) {
      table.text('description', 'longtext').alter();
    });
  };
  
  exports.down = async function(knex) {
    return knex.schema.alterTable('events', function(table) {
      table.string('description', 255).alter();
    });
  };