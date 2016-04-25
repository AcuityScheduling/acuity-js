# Acuity Scheduling API - JS Tool Kit

Welcome to the Acuity Scheduling JS SDK.  This SDK provides examples and a standard library for integrating with the [Acuity Scheduling API](https://acuityscheduling.com/) using JS.  You can learn more about developing for Acuity Scheduling at [developers.acuityscheduling.com](https://developers.acuityscheduling.com/).

## Installation

This package can be installed for node using npm:

```sh
$ npm install --save acuityscheduling
```

Then require it in your app:

```js
var Acuity = require('acuityscheduling');
```

Currently our API is only for server-side access and our SDK won't work on the client-side.

## Hello World

Here's a basic example to get started.  Just set your <a href="https://secure.acuityscheduling.com/app.php?key=api&action=settings" target="_blank">API credentials</a> and run:

```js
var Acuity = require('acuityscheduling');
var userId = null;
var apiKey = null;

var acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});

acuity.request('/appointments', function (err, res, appointments) {
  if (err) return console.error(err);
  console.log(appointments);
});
```

## Examples

You'll find several examples of different Acuity integrations in the [examples/](examples/) directory.  These examples cover:
* [Basic API Access](#basic-api-access)
* [OAuth2 API Access](#oauth2-api-access)
* [Webhooks](#webhooks)
* [Custom Sidebar](#custom-sidebar)

##### Sample `examples/config.json`

Create a config file with your <a href="https://secure.acuityscheduling.com/app.php?key=api&action=settings" target="_blank">API credentials</a> to get started.  All examples
share a common config file containing your Acuity `userId` and `apiKey` for basic API access and verifying callbacks.  [OAuth2 examples](#oauth2-api-access) require
additional OAuth2 client account credentials.

```json
{
	"userId": 1,
	"apiKey": "abc123"
}
```

### Basic API Access

[examples/basic/](examples/basic) is a basic API integration for a single account.

Start the example server by doing `PORT=8000 node examples/basic/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

### Create an Appointment

[examples/create-appointment/](examples/create-appointment) is a more advanced API example for scheduling an appointment.  In this example, you'll see how to:

* fetch appoinment types
* find an available date and time
* create the appointment

Start the example server by doing `PORT=8000 node examples/create-appointment/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

### OAuth2 API Access

[examples/oauth2/](examples/oauth2) is an OAuth2 API integration.  Use this to get connected with multiple Acuity accounts.

Create a config file with your OAuth2 credentials to get started.  If you don't have OAuth2 credentials, please fill out this <a href="https://acuityscheduling.com/oauth2/register" target="_blank">registration form</a>.
Start the example server by doing `PORT=8000 node examples/oauth2/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

##### Sample `examples/config.json`
```json
{
	"clientId": "N4HgVZbjHVp3HAkR",
	"clientSecret": "H33vYz88sEiKVbl7EMob1URDrqZrvceSCMmZJpAi",
	"redirectUri": "http://127.0.0.1:8000/oauth2"
}
```

### Webhooks

[examples/webhooks/](examples/webhooks) is a sample webhook integration.

Start the example server by doing `PORT=8000 node examples/webhooks/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

### Custom Sidebar

[examples/custom-sidebar/](examples/custom-sidebar) allows you to display custom information in the appointment details sidebar.

Start the example server by doing `PORT=8000 node examples/custom-sidebar/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>
