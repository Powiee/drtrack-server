var express = require('express');

module.exports.Router = function(User) {
  return express.Router()
    .post('/', function(req, res) {
      if (req.body.username && req.body.password) {
        var data = [];
        if (req.body.username) data.push({ username: req.body.username });
        User.find( data, function(err, user) {
          if (!(user && user.length > 0)) {
            var newUser = new User({
              username: req.body.username,
              password: req.body.password
            });
            newUser.save();
            res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }
        });
      } else {
        res.sendStatus(400);
      }
    });
};
