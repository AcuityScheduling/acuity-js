// Deps
var utils = require('../utils');
var config = require('../config');
var Acuity = require('../../');


// App:
var app = utils.express({views: __dirname}); 


// Router:
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/authorize', function (req, res) {
  // Redirect the user to the Acuity authorization endpoint.  You must
  // choose a scope to work with.
  var acuity = Acuity.oauth(config);
  acuity.authorizeRedirect(res, {scope: 'api-v1'});
});

app.get('/oauth2', function (req, res) {

  var options = Object.create(config);
  options.accessToken = config.accessToken || req.session.accessToken;
  var acuity = Acuity.oauth(options);
  var response = res;
  var query = req.query;

  if (!query.code || query.error) {
    response.render('oauth2.html', {
      error: query.error,
      query: JSON.stringify(query, null, '  ')
    });
  }

  // Exchange the authorization code for an access token and store it
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

      response.render('oauth2.html', {
        query: JSON.stringify(query, null, '  '),
        tokenResponse: JSON.stringify(tokenResponse, null, '  '),
        me: JSON.stringify(me, null, '  ')
      });
    });
  });
});


// Server:
var server = utils.start(app);
