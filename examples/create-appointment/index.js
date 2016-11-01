// Deps:
var config = require('../config');
var Acuity = require('../../');
var utils = require('../utils');


// App:
var app = utils.express({views: __dirname});


// Router:
app.get('/', function (request, response) {
  var acuity = Acuity.basic(config);
  var session = request.session;

  session.appointmentTypes = null;
  session.appointmentTypeID = null;
  session.date = null;
  session.time = null;

  response.render('index.html', {
    start: true
  });
});

app.post('/', function (request, response) {

  var body = request.body;
  var acuity = Acuity.basic(config);
  var session = request.session;
  var appointmentType = null;
  var appointmentTypes = session.appointmentTypes || null;
  var appointmentTypeID = session.appointmentTypeID = body.appointmentTypeID || session.appointmentTypeID || null;
  var date = session.date = body.date || session.date || null;
  var time = session.time = body.time || session.time || null;

  // First fetch possible appointment types:
  if (!appointmentTypes) {
    return acuity.request('/appointment-types').then(function (appointmentTypesR) {
      request.session.appointmentTypes = appointmentTypesR.data;
      response.render('index.html', {
        appointmentTypes: appointmentTypesR.data
      });
    }).catch(function(err){return console.error("Error appointment-types: "+err.error+" with message: "+err.message);})
  }

  // Grab the selected appointment type:
  appointmentTypes.forEach(function (type) {
    if (type.id == appointmentTypeID) {
      appointmentType = appointmentType = type;
    }
  });

  // Appointment type id:
  if (!appointmentType) {
    return response.render('index.html', {
      appointmentTypes: appointmentTypesR.data
    });
  }

  // Date:
  if (!date) {
    var month = new Date();
    month = month.getFullYear() + '-' + (month.getMonth() + 1);
    return acuity.request('/availability/dates?month=' + month + '&appointmentTypeID=' + appointmentType.id).then(function (datesR) {

      response.render('index.html', {
        appointmentType: appointmentType,
        dates: datesR.data
      });
    });
  }

  // Time:
  if (!time) {
    return acuity.request('/availability/times?date=' + date + '&appointmentTypeID=' + appointmentType.id).then(function (timesR) {
      response.render('index.html', {
        appointmentType: appointmentType,
        date: date,
        times: timesR.data
      });
    });
  }

  // Client info:
  if (!body.firstName || !body.lastName || !body.email) {
    return response.render('index.html', {
      appointmentType: appointmentType,
      date: date,
      time: time
    });
  }

  // Create appointment:
  var options = {
    method: 'POST',
    data: {
      appointmentTypeID: appointmentTypeID,
      datetime:          time,
      firstName:         body.firstName,
      lastName:          body.lastName,
      email:             body.email
    }
  };
  return acuity.request('/appointments', options).then(function (appointmentR) {
    response.render('index.html', {
      appointment: JSON.stringify(appointmentR.data, null, '  ')
    });
  }).catch(function(err){return console.error("Error appointments: "+err.error+" with message: "+err.message);})
});


// Server:
var server = utils.start(app);
