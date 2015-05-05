var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
      username: String,
      password: String,
      role: {
        type: String
      }
    }, { collection: 'users' });

module.exports = mongoose.model('User', schema, 'users');
