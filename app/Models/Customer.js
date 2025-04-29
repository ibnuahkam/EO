'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    static get table () {
        return 'customer';
    }

    static get fillable () {
        return ['user_id', 'phone', 'gender', 'birth'];
    }

    static get createdAtColumn () {
        return 'created_at';
    }

    static get updatedAtColumn () {
        return 'updated_at';
    }
}

module.exports = Customer
