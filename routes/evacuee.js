var express = require('express');

module.exports.Router = function(Evacuee) {
  return express.Router()
    .get('/', function(req, res) {
      Evacuee.find({}, function(err, data) {
        res.json(data);
      });
    })
    .post('/', function(req, res) {
      var fieldsObj = req.body;
      var fields = [];
      for(var attr in fieldsObj) {
        if(fieldsObj[attr] && (attr == 'passport' || attr == 'driverLic' || attr == 'ssn' || attr == 'code')) {
          var obj = {};
          obj[attr] = fieldsObj[attr];
          fields.push(obj);
        }
      }
      Evacuee.find({ $or: fields }, function(err, data) {
        if (!(data && data.length > 0)) {
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
    .put('/', function(req, res) {
      Evacuee.findOneAndUpdate({code: req.body.code}, 
      {
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
      } , function(err, data) {
        console.log(data);
        res.sendStatus(200);
      });
    })
    .delete('/:id', function(req, res) {
      Evacuee.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) res.sendStatus(400);
        res.sendStatus(200);
      });
    })
    .get('/:code', function(req, res) {
      Evacuee.find({code: req.params.code}, function(err, data) {
        res.json(data);
      });
    })
    .post('/search', function(req, res) {
      var fields = req.body;
      for(var attr in fields) {
        if(!fields[attr]) {
          delete fields[attr];
        }
      }
      Evacuee.find( fields, function(err, data) {
        if(data && data.length > 0) {
          res.json(data);
        } else {
          res.sendStatus(400);
        }
      });
    })
    .post('/validate', function(req, res) {
      var fieldsObj = req.body;
      var fields = [];
      for(var attr in fieldsObj) {
        if(fieldsObj[attr] && (attr == 'passport' || attr == 'driverLic' || attr == 'ssn')) {
          var obj = {};
          obj[attr] = fieldsObj[attr];
          fields.push(obj);
        }
      }
      Evacuee.find({ $or: fields }, function(err, data) {
        if(data && data.length > 0) {
          res.json(data);
        } else {
          res.sendStatus(400);
        }
      })
    });
};
