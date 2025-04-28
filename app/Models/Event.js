'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
    static get table () {
        return 'events';
    }

    static get fillable () {
        return ['user_id', 'no_ticket', 'title', 'description', 'location', 'date', 'status'];
    }

    documents() {
        return this.hasMany('App/Models/DocumentManagement', 'id', 'event_id')
      }
    

    static get createdAtColumn () {
        return 'created_at';
    }

    static get updatedAtColumn () {
        return 'updated_at';
    }
}

module.exports = Event
