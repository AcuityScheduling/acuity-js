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
    console.log("Success from endpoint: "+me.req.url+" : You are "+me.res.email);

    acuity.request('/blocks', blocksOptions).then(function (block) {
      var appointmentsOptions = {
        qs: {
          max: 1
        }
      };
      acuity.request('/appointments', appointmentsOptions).then(function (appointments) {
        response.render('index.html', {
          me: JSON.stringify(me.res, null, '  '),
          block: JSON.stringify(block.res, null, '  '),
          appointments: JSON.stringify(appointments.res, null, '  ')
        });
      }).catch(function(err){
        return console.error("Error appointments: "+err);
      });
    }).catch(function(err){
      return console.error("Error blocks: "+err);
    });
  }).catch(function(err){
    return console.error("Error me: "+err);
  });
});


// Server:
var server = utils.start(app);
