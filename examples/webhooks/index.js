// Deps
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };
var secret = '123abc';

// App:
var app = express();
var bodyParserMiddleware = bodyParser.urlencoded({
  verify: function (req, res, buf, encoding) {

    // Get hash of message using shared secret:
    var hasher = crypto.createHmac('sha256', secret);
    hasher.update(buf.toString());
    var hash = hasher.digest('base64');

    // Compare hash to Acuity signature:
    if (hash !== req.header('X-Acuity-Signature')) {
      throw new Error('This message was forged!');
    }
  }
});

app.get('/', function (req, res) {
  res.sendFile('index.html', sendFileConfig);
});

app.post('/webhook', bodyParserMiddleware, function (req, res) {
  // The message is authentic:
  console.log("The message is authentic:\n" + JSON.stringify(req.body, null, '  '));
  res.send('');
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

