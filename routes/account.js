var express = require('express');

module.exports.Router = function() {
  return express.Router()
    .get('/:id', function(req, res, next) {
      res.json({ name: "Fake Name" });
    });
};
