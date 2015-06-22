// Deps
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var oauth = require('./oauth-config');

// Config:
var port = process.env.PORT || 8000;
var root = __dirname + '/';
var sendFileConfig = { root: root };

// App:
var app = express();
app.use(bodyParser.json());

// Router:
app.get('/', function (req, res) {
  res.sendFile('index.html', sendFileConfig);
});

app.get('/authorize', function (req, res) {
  res.redirect(oauth.base + '/oauth2/authorize' + '?' + [
    { key: 'scope', value: oauth.scope },
    { key: 'client_id', value: oauth.key },
    { key: 'redirect_uri', value: oauth.redirect },
    { key: 'response_type', value: 'code' },
  ].reduce(function (query, o) {
    return query + (query ? '&' : '') + encodeURIComponent(o.key) + '=' + encodeURIComponent(o.value);
  }, ''));
});

app.get('/oauth2', function (req, res) {
  var query = req.query;
  if (query.code && !query.error) {
    var options = {
      form: {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: oauth.redirect,
        client_id: oauth.key,
        client_secret: oauth.secret
      }
    };
    request.post(oauth.base + '/oauth2/token', options, function (err, response, body) {
      if (err) {
        console.error(err);
      }
      json = JSON.parse(body);
      var meOptions = {
        url: oauth.base + '/api/v2/me',
        headers: {
          'Authorization': 'Bearer ' + json.access_token
        }
      };
      console.log(meOptions);
      request(meOptions, function (err, response, body) {
        if (err) {
          console.error(err);
        } else {
          var me = JSON.parse(body);
        }
        res.send(
          '<h1>Callback Query:</h1>' +
          '<pre>'+JSON.stringify(query, null, '  ')+'</pre>' +
          '<h1>Token Request:</h1>' +
          '<pre>'+JSON.stringify(options.form, null, '  ')+'</pre>' +
          '<h1>Token Response:</h1>' +
          '<pre>'+JSON.stringify(json, null, '  ')+'</pre>' +
          '<h1>GET /me:</h1>' +
          '<pre>'+JSON.stringify(me, null, '  ')+'</pre>'
        );
      });
    });
  } else {
    res.send(
      '<h1>Callback Query:</h1>' +
      '<pre>'+JSON.stringify(query, null, '  ')+'</pre>' +
      '<p>An error has occurred: ' + query.error + '.<p>'
    );
  }
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

