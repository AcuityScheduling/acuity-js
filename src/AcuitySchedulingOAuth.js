/**
 * AcuitySchedulingOAuth Class
 */

var AcuityScheduling = require('./AcuityScheduling');
var querystring = require('querystring');
var request = require('request');
var pkg = require('../package');

function AcuitySchedulingOAuth (config) {

  config = config || {};

  this.base = config.base || AcuityScheduling.base;
  this.clientId = config.clientId;
  this.clientSecret = config.clientSecret;
  this.redirectUri = config.redirectUri;
  this.accessToken = config.accessToken || null;

  return this;
}

AcuitySchedulingOAuth.prototype = Object.create(AcuityScheduling.prototype);

AcuitySchedulingOAuth.prototype.getAuthorizeUrl = function (params) {

  params = params || {};

  if (!params.scope) {
    console.error('Missing `scope` parameter.');
  }

  var query = {
    response_type:  'code',
    scope:          params.scope,
    client_id:      this.clientId,
    redirect_uri:   this.redirectUri
  };

  if (params.state) {
    query.state = params.state;
  }

  return this.base + '/oauth2/authorize' + '?' + querystring.stringify(query);
};

AcuitySchedulingOAuth.prototype.authorizeRedirect = function (res, params) {
  res.writeHead(302, {'location': this.getAuthorizeUrl(params)});
  res.send();
};

AcuitySchedulingOAuth.prototype.requestAccessToken = function (code, cb) {

  var that = this;
  var options = {
    headers: {
      'User-Agent': AcuityScheduling.agent
    },
    form: {
      grant_type:    'authorization_code',
      code:          code,
      redirect_uri:  this.redirectUri,
      client_id:     this.clientId,
      client_secret: this.clientSecret
    }
  };

  return request.post(this.base + '/oauth2/token', options, function (err, response, body) {
    if (err) return cb(err);
    var tokenResponse = JSON.parse(body);
    if (tokenResponse.access_token) {
      that.accessToken = tokenResponse.access_token;
    }
    cb(err, tokenResponse);
  });
};

AcuitySchedulingOAuth.prototype.isConnected = function () {
  return this.accessToken ? true : false;
};

AcuitySchedulingOAuth.prototype.request = function (path, options, cb) {
  options = options || {};
  var headers = options.headers = options.headers || {};
  headers.Authorization = headers.Authorization || 'Bearer ' + this.accessToken;
  return this._request(path, options, cb);
};

module.exports = AcuitySchedulingOAuth;
