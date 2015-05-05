var express = require('express');

module.exports.Router = function(Manifest) {
  return express.Router()
    .get('/', function(req, res) {
      Manifest.find({}, function(err, manifest) {
        res.json(manifest);
      });
    });
};
