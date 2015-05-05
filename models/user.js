var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
      username: String,
      password: String,
      role: {
        type: String
      }
    });
    module.exports = mongoose.model('User', schema, 'users');
