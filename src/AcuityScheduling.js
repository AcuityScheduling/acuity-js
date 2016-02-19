/**
 * AcuityScheduling Class
 */

var request = require('request');
var pkg = require('../package');

function AcuityScheduling (config) {

  config = config || {};

  this.base = config.base || AcuityScheduling.base;
  this.apiKey = config.apiKey;
  this.userId = config.userId;

  return this;
}

AcuityScheduling.base = 'https://acuityscheduling.com';
AcuityScheduling.agent = 'AcuityScheduling-js/' + pkg.version;

AcuityScheduling.prototype._request = function (path, options, cb) {

  options = options || {};
  if (!cb) {
    cb = (typeof options === 'function') ? options : function () {};
  }

  path = typeof path === 'string' ? path : '';
  var config = {
    url: this.base + '/api/v1' + (path.charAt(0) === '/' ? '' : '/') + path,
    json: true
  };

  // Set configurable options:
  if (options.auth)     config.auth     = options.auth;
  if (options.body)     config.body     = options.body;
  if (options.method)   config.method   = options.method;
  if (options.qs)       config.qs       = options.qs;
  config.headers =      options.headers || {};

  // User agent:
  config.headers['User-Agent'] = AcuityScheduling.agent;

  return request(config, function (err, response, body) {
    if (err) return cb(err, response, body);
    cb(err, response, body);
  });
};

AcuityScheduling.prototype.request = function (path, options, cb) {
  options = options || {};
  options.auth = options.auth || {
    user: this.userId + '',
    pass: this.apiKey
  };
  return this._request(path, options, cb);
};

module.exports = AcuityScheduling;

