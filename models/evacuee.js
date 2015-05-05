var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
      firstName: String,
      middleName: String,
      lastName: String,
      passport: String,
      driverLic: String,
      ssn: String,
      dob: String,
      gender: String,
      nationality: String,
      majorCategory: String,
      minorCategory: {
        pregnant: Boolean,
        under: Boolean
      },
      militaryAfflicated: String,
      code: String,
      bloodType: String,
      weight: Number,
      specialNeeds: String
    }, { collection: 'evacuees' });

module.exports = mongoose.model('Evacuee', schema, 'evacuees');
