/**
 * Acuity lib
 */

var AcuityScheduling = require('./AcuityScheduling');
var AcuitySchedulingOAuth = require('./AcuitySchedulingOAuth');
var querystring = require('querystring');
var crypto = require('crypto');

var acuity = {

  basic: function (config) {
    return new AcuityScheduling(config);
  },

  oauth: function (config) {
    return new AcuitySchedulingOAuth(config);
  },

  verifyMessageSignature: function (secret, body, signature) {

    if (!secret || typeof secret !== 'string') {
      throw new Error('Verify the message signature using your API key as the secret.');
    }

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
  },

	/**
	 * Generate embed code for $owner.
	 *
	 * @param {number} owner  The owner's id.
	 * @param {object} options  Additional options.
	 *	- width  Iframe width
	 *	- height  Iframe height
	 *	- query  Query string arguments
	 */
	getEmbedCode: function (owner, options) {

    options = Object.create(options || {});
    options.height  = options.height  || '800';
    options.width   = options.width   || '100%';

    var query = options.query   = options.query   || {};
    query.owner = query.owner || owner;

    // Encode options:
    for (key in options) {
      if (key === 'query') {
        options[key] = querystring.stringify(options[key]);
      } else {
        options[key] = escape(options[key]);
      }
    }

		return '' +
			'<iframe src="https://app.acuityscheduling.com/schedule.php?'+options.query+'" width="'+options.width+'" height="'+options.height+'" frameBorder="0"></iframe>' +
			'<script src="https://d3gxy7nm8y4yjr.cloudfront.net/js/embed.js" type="text/javascript"></script>';
	}
};

/**
 * Escape HTML entities
 *
 * Escape function borrowed from Mustache.
 */
var enitites = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
function escape (s) {
  return (s + '').replace(/[&<>"'\/]/g, function (c) {
    return entities[c];
  });
}

module.exports = acuity;
