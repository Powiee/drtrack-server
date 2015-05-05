var express = require('express');

module.exports.Router = function(Evacuee) {
  return express.Router()
    .get('/', function(req, res) {
      Evacuee.find({}, function(err, evacuee) {
        res.json(evacuee);
      });
    })
    .post('/', function(req, res) {
      Evacuee.find({ $or: [ {passport: req.body.passport}, {driverLic: req.body.driverLic}, {ssn: req.body.ssn} ]},
      function(err, evacuee) {
        if (!evacuee.length) {
          var newEvacuee = new Evacuee({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            passport: req.body.passport,
            driverLic: req.body.driverLic,
            ssn: req.body.ssn,
            dob: req.body.dob,
            gender: req.body.gender,
            nationality: req.body.nationality,
            majorCategory: req.body.majorCategory,
            minorCategory: {
              pregnant: req.body.pregnant,
              under: req.body.under
            },
            militaryAfflicated: req.body.militaryAfflicated,
            code: req.body.code,
            bloodType: req.body.bloodType,
            weight: req.body.weight,
            specialNeeds: req.body.specialNeeds
          });
          newEvacuee.save();
          res.end("SUCCESS");
        } else {
          res.end("FAILURE");
        }
      });
    })
    .get('/:code', function(req, res) {
      Evacuee.find({code: req.params.code}, function(err, evacuee) {
        res.json(evacuee);
      })
    });
};
