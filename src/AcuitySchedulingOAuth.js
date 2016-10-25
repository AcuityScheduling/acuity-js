/**
 * AcuitySchedulingOAuth Class
 */

var AcuityScheduling = require('./AcuityScheduling');
var querystring = require('querystring');
var requestLib = require("request-promise-native");
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

AcuitySchedulingOAuth.prototype.requestAccessToken = function (code) {

  var that = this;
  var options = {
    method: 'POST',
    url: this.base + '/oauth2/token',
    json: true,
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


  return requestLib(options).then(function(tokenResponse){
    if (tokenResponse.access_token) {
      that.accessToken = tokenResponse.access_token;
    }
    return {req: options, res:tokenResponse};
  })
};

AcuitySchedulingOAuth.prototype.isConnected = function () {
  return this.accessToken ? true : false;
};

AcuitySchedulingOAuth.prototype.request = function (path, options) {
  options = options || {};
  var headers = options.headers = options.headers || {};
  headers.Authorization = headers.Authorization || 'Bearer ' + this.accessToken;
  return this._request(path, options);
};

module.exports = AcuitySchedulingOAuth;
