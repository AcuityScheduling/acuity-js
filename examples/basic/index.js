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

  acuity.request('/me').then(function (me) {

    var blocksOptions = {
      method: 'POST',
      body: {
        start: '2015-12-24',
        end: '2015-12-26',
        calendarID: 1,
        notes: 'Christmas!'
      }
    };
    console.log("Success from endpoint: "+me.request.uri.pathname+" : You are "+me.body.email);

    acuity.request('/blocks', blocksOptions).then(function (block) {
      var appointmentsOptions = {
        qs: {
          max: 1
        }
      };
      acuity.request('/appointments', appointmentsOptions).then(function (appointments) {
        response.render('index.html', {
          me: JSON.stringify(me.body, null, '  '),
          block: JSON.stringify(block.body, null, '  '),
          appointments: JSON.stringify(appointments.body, null, '  ')
        });
      })
    })
  })
});


// Server:
var server = utils.start(app);
