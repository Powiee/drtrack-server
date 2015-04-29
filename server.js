var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var accountRouter = require('./routes/account').Router(),
    userRouter = require('./routes/user').Router();

app.use('/api/account', accountRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT || 80);
