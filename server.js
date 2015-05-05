var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    User = require('./models/user'),
    Evacuee = require('./models/evacuee'),
    Manifest = require('./models/manifest'),
    evacueeRouter = require('./routes/evacuee').Router(Evacuee),
    manifestRouter = require('./routes/manifest').Router(Manifest);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/drtrack');

app.use('/api/evacuee', evacueeRouter);
app.use('/api/manifest', manifestRouter);

app.post('/api/login', function(req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    res.json(user);
  });
});

app.listen(process.env.PORT || 80);
