// Deps
var express = require('express');
var bodyParser = require('body-parser');
var Acuity = require('../../');
var config = require('../config');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };
var secret = config.apiKey;

// App:
var app = express();

// Verification middleware for the webhook route
var verifyMiddleware = bodyParser.urlencoded({
  verify: Acuity.bodyParserVerify(secret)
});

// Router:
app.get('/', function (req, res) {
  res.sendFile('index.html', sendFileConfig);
});

app.post('/custom-sidebar', verifyMiddleware, function (req, res) {
  setTimeout(function () {
    res.send(
      '<h4>Callback Example:</h4>' +
      '<pre>' +
      JSON.stringify(req.body, null, '  ') +
      '</pre>'
    );
  }, 500);
});

// Server:
var server = app.listen(port, function () {
  console.log('Listening on %s', port);
});
server.on('error', function (e) {
  if (e.code === 'EADDRINUSE') {
    console.error('Error listening on %s', port);
  } else {
    console.error(e);
  }
});

