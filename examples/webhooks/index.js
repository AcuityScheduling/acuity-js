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

app.post('/webhook', verifyMiddleware, function (req, res) {
  // The message is authentic:
  console.log("The message is authentic:\n" + JSON.stringify(req.body, null, '  '));
  res.send('');
});


// Server:
var server = utils.start(app);
