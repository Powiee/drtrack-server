var express = require('express');

module.exports.Router = function(Evacuee) {
  return express.Router()
    .get('/', function(req, res) {
      Evacuee.find({}, function(err, evacuee) {
        res.json(evacuee);
      });
    })
    .post('/', function(req, res) {
      Evacuee.find({ $or: [ {passport: req.body.passport}, {driverLic: req.body.driverLic}, {ssn: req.body.ssn}, {code: req.body.code} ]},
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
          res.sendStatus(200).send();
        } else {
          res.sendStatus(400);
        }
      });
    })
    .get('/:code', function(req, res) {
      Evacuee.find({code: req.params.code}, function(err, evacuee) {
        res.json(evacuee);
      })
    })
    .post('/validate', function(req, res) {
      var data = [];
      if (req.body.passport) data.push({passport: req.body.passport});
      if (req.body.driverLic) data.push({driverLic: req.body.driverLic});
      if (req.body.ssn) data.push({ssn: req.body.ssn});
      Evacuee.find({ $or: data},
      function(err, evacuee) {
        if(evacuee && evacuee.length > 0) {
          res.json(evacuee);
        } else {
          res.sendStatus(400);
        }
      })
    });
};
