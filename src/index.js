/**
 * Acuity lib
 */

var AcuityScheduling = require('./AcuityScheduling');
var AcuitySchedulingOAuth = require('./AcuitySchedulingOAuth');
var crypto = require('crypto');

var acuity = {

  basic: function (config) {
    return new AcuityScheduling(config);
  },

  oauth: function (config) {
    return new AcuitySchedulingOAuth(config);
  },

  verifyMessageSignature: function (secret, body, signature) {

    // Get hash of message using shared secret:
    var hasher = crypto.createHmac('sha256', secret);
    hasher.update(body);
    var hash = hasher.digest('base64');

    // Compare hash to Acuity signature:
    if (hash !== signature) {
      throw new Error('This message was forged!');
    }
  },

  bodyParserVerify: function (secret) {
    return function (req, res, buf, encoding) {
      var body = buf.toString();
      var signature = req.headers['X-Acuity-Signature'.toLowerCase()];
      acuity.verifyMessageSignature(secret, body, signature);
    };
  }
};

module.exports = acuity;
