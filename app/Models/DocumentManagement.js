'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DocumentManagement extends Model {
    static get table () {
        return 'document_management';
    }

    static get fillable () {
        return ['user_id', 'event_id', 'images', 'description'];
    }

    event() {
        return this.belongsTo('App/Models/Event')
      }

    static get createdAtColumn () {
        return 'created_at';
    }

    static get updatedAtColumn () {
        return 'updated_at';
    }
}

module.exports = DocumentManagement
