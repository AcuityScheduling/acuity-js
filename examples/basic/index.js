// Deps:
var config = require('../config');
var Acuity = require('../../');
var utils = require('../utils');


// App:
var app = utils.express({views: __dirname});


// Router:
app.get('/', function (req, res) {

  var acuity = Acuity.basic(config);
  var response = res;

  acuity.request('/me', function (err, res, me) {
    if (err) return console.error(err);

    var blocksOptions = {
      method: 'POST',
      body: {
        start: '2015-12-24',
        end: '2015-12-26',
        calendarID: 1,
        notes: 'Christmas!'
      }
    };
    acuity.request('/blocks', blocksOptions, function (err, res, block) {
      var appointmentsOptions = {
        qs: {
          max: 1
        }
      };
      acuity.request('/appointments', appointmentsOptions, function (err, res, appointments) {

        response.render('index.html', {
          me: JSON.stringify(me, null, '  '),
          block: JSON.stringify(block, null, '  '),
          appointments: JSON.stringify(appointments, null, '  ')
        });
      });
    });
  });
});


// Server:
var server = utils.start(app);
