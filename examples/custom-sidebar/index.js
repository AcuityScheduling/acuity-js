// Deps
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var utils = require('../utils');
var Acuity = require('../../');


// App:
var app = express();
utils.configure(app, {views: __dirname});


// Verification middleware for the webhook route
var secret = config.apiKey;
var verifyMiddleware = bodyParser.urlencoded({
  verify: Acuity.bodyParserVerify(secret)
});


// Router:
app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/custom-sidebar', verifyMiddleware, function (req, res) {
  setTimeout(function () {
    res.render('sidebar.html', {
      details: JSON.stringify(req.body, null, '  ')
    });
  }, 500);
});


// Server:
var server = utils.start(app);
