var config = require('./config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    User = require('./models/user'),
    Evacuee = require('./models/evacuee'),
    Manifest = require('./models/manifest'),
    userRouter = require('./routes/user').Router(User),
    evacueeRouter = require('./routes/evacuee').Router(Evacuee),
    manifestRouter = require('./routes/manifest').Router(Manifest);

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(allowCrossDomain);

mongoose.connect(config.db.mongodb);

app.use('/api/evacuee', evacueeRouter);
app.use('/api/manifest', manifestRouter);
app.use('/api/user', userRouter);

app.post('/api/login', function(req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  });
});

app.listen(process.env.PORT || 80);
