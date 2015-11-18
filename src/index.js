/**
 * Acuity lib
 */

var AcuityScheduling = require('./AcuityScheduling');
var AcuitySchedulingOAuth = require('./AcuitySchedulingOAuth');

module.exports = {
  basic: function (config) {
    return new AcuityScheduling(config);
  },
  oauth: function (config) {
    return new AcuitySchedulingOAuth(config);
  }
};
