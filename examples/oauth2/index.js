// Deps
var express = require('express');
var session = require('express-session');
var _ = require('underscore');
var bodyParser = require('body-parser');
var request = require('request');
var config = require('./config');
var Acuity = require('../../');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };

// App:
var app = express();
app.use(bodyParser.json());
app.use(session({secret: 'pwnz0rz', saveUninitialized: true, resave: false}));

// Router:
app.get('/', function (req, res) {
  var acuity = Acuity.oauth(config);
  res.sendFile('index.html', sendFileConfig);
});

app.get('/authorize', function (req, res) {
	// Redirect the user to the Acuity authorization endpoint.  You must
	// choose a scope to work with.
  var acuity = Acuity.oauth(config);
  acuity.authorizeRedirect(res, {scope: 'api-v1'});
});

app.get('/oauth2', function (req, res) {

  var acuity = Acuity.oauth(_.extend({
    accessToken: req.session.accessToken
  }, config));
  var response = res;
  var query = req.query;

  if (!query.code || query.error) {
    return response.send(
      '<h1>Callback Query:</h1>' +
      '<pre>'+JSON.stringify(query, null, '  ')+'</pre>' +
      '<p>An error has occurred: ' + query.error + '.<p>'
    );
  }

	// Exchange the authorizatoin code for an access token and store it
	// somewhere.  You'll need to pass it to the AcuitySchedulingOAuth
  // constructor to make calls later on.
  acuity.requestAccessToken(query.code, function (err, tokenResponse) {

    if (err) return console.error(err);

    // Store that access token somewhere:
    if (tokenResponse.access_token) {
      req.session.accessToken = tokenResponse.access_token;
    }

    // Make a sample request:
    acuity.request('me', function (err, res, me) {

      if (err) return console.error(err);

      response.send(
        '<h1>Callback Query:</h1>' +
        '<pre>'+JSON.stringify(query, null, '  ')+'</pre>' +
        '<h1>Token Response:</h1>' +
        '<pre>'+JSON.stringify(tokenResponse, null, '  ')+'</pre>' +
        '<h1>GET /me:</h1>' +
        '<pre>'+JSON.stringify(me, null, '  ')+'</pre>'
      );
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

