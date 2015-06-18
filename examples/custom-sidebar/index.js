// Deps
var express = require('express');
var bodyParser = require('body-parser');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };

// App:
var app = express();
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.sendFile('index.html', sendFileConfig);
});

app.post('/custom-sidebar', function (req, res) {
  setTimeout(function () {
    res.send(
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

