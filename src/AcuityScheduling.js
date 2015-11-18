/**
 * AcuityScheduling Class
 */

function AcuityScheduling (config) {

  config = config || {};

  this.base = config.base || AcuityScheduling.base;
  this.apiKey = config.apiKey;
  this.userId = config.userId;

  return this;
}

AcuityScheduling.base = 'https://acuityscheduling.com';

AcuityScheduling.prototype.request = function () {
  throw new Error('TODO');
};

module.exports = AcuityScheduling;

