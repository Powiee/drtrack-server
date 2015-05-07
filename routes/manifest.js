var express = require('express');

module.exports.Router = function(Manifest) {
  return express.Router()
    .get('/', function(req, res) {
      Manifest.find({}, function(err, data) {
        res.json(data);
      });
    })
    .put('/', function(req, res) {
      Manifest.findOneAndUpdate({_id: req.body._id}, req.body, function(err, data) {
          if(!err) {
            res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }
        }
      );
    });
};
