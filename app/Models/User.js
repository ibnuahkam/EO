// app/Models/User.js
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    // Set default values or hooks if needed
  }
}

module.exports = User
