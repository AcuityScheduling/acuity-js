/**
 * AcuityScheduling Class
 */

var request = require('request');

function AcuityScheduling (config) {

  config = config || {};

  this.base = config.base || AcuityScheduling.base;
  this.apiKey = config.apiKey;
  this.userId = config.userId;

  return this;
}

AcuityScheduling.base = 'https://acuityscheduling.com';

AcuityScheduling.prototype._request = function (path, options, cb) {

  options = options || {};
  if (!cb) {
    cb = (typeof options === 'function') ? options : function () {};
  }

  var config = {
    url: this.base + '/api/v1/' + path,
    json: true
  };

  if (options.auth)     config.auth     = options.auth;
  if (options.body)     config.body     = options.body;
  if (options.headers)  config.headers  = options.headers;
  if (options.method)   config.method   = options.method;
  if (options.qs)       config.qs       = options.qs;

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

