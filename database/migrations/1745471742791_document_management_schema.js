'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentManagementSchema extends Schema {
  up () {
    this.create('document_managements', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('document_managements')
  }
}

module.exports = DocumentManagementSchema
