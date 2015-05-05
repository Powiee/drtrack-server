var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
      name: String,
      type: String,
      capacity: Number,
      space: Number
    }, { collection: 'manifests' });

module.exports = mongoose.model('Manifest', schema, 'manifests');
