var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
      name: String,
      vehicleType: String,
      vehicleDescription: String,
      destination: String,
      departureLocation: String,
      departureDateTime: String,
      flightNumber: String,
      capacity: Number,
      evacuee: [String]
    }, { collection: 'manifests' });

module.exports = mongoose.model('Manifest', schema, 'manifests');
