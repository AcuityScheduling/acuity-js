var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var hbs = require('hbs');

/**
 * Configure Express app
 */
function configure (app, options) {
  app.set('view engine', 'html');
  app.set('views', options.views);
  app.engine('html', hbs.__express);
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(session({
    secret: 'pwnz0rz',
    saveUninitialized: true,
    resave: false
  }));
  return app;
}

/**
 * Start server
 */
function start (app) {

  var port = process.env.PORT || 8000;
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

  return server;
}

/**
 * Exports:
 */
module.exports = {
  express: function (options)
  {
    return configure(express(), options);
  },
  configure: configure,
  start: start
};
