// Deps:
var express = require('express');
var config = require('../config');
var Acuity = require('../../');
var fs = require('fs');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };

// App:
var app = express();

// Router:
app.get('/', function (req, res) {
  var acuity = Acuity.basic(config);
  var html = fs.readFileSync(root + 'index.html');
  var response = res;

  acuity.request('me', function (err, res, me) {
    if (err) return console.error(err);

	  html += '<h1>POST /api/v1/blocks:</h1>';
    html += '<pre>';
    html += JSON.stringify(me, null, '  ');
    html += '</pre>';

    var blocksOptions = {
      method: 'POST',
      body: {
        start: '2015-12-24',
        end: '2015-12-26',
        calendarID: 1,
        notes: 'Christmas!'
      }
    };
    acuity.request('blocks', blocksOptions, function (err, res, block) {

      html += '<h1>POST /api/v1/blocks:</h1>';
      html += '<pre>';
      html += JSON.stringify(block, null, '  ');
      html += '</pre>';

      var appointmentsOptions = {
        qs: {
          max: 1
        }
      };
      acuity.request('appointments', appointmentsOptions, function (err, res, appointments) {
        html += '<h1>GET /api/v1/appointments?max=1</h1>';
        html += '<pre>';
        html += JSON.stringify(appointments, null, '  ');
        html += '</pre>';

        response.send(html);
      });
    });
  });
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

