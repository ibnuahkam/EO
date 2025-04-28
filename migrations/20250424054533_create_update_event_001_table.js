exports.up = function(knex) {
    return knex.schema.table('events', function(table) {
      table.integer('no_ticket').after('user_id'); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('events', function(table) {
      table.dropColumn('no_ticket');
    });
  };
  