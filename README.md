# Acuity Scheduling API - JS Tool Kit

Welcome to the Acuity Scheduling JS SDK.  This SDK provides examples and a standard library for integrating with the [Acuity Scheduling API](https://acuityscheduling.com/) using JS.  You can learn more about developing for Acuity Scheduling at [developers.acuityscheduling.com](https://developers.acuityscheduling.com/).

## Installation

This package can be installed with npm:

```sh
$ npm install --save acuityscheduling
```

Then require it in your app:

```js
var Acuity = require('acuityscheduling');
```

## Examples

You'll find several examples of different Acuity integrations in the [examples/](examples/) directory.  These examples cover:
* [Basic API Access](#basic-api-access)
* [OAuth2 API Access](#oauth2-api-access)
* [Webhooks](#webhooks)
* [Custom Sidebar](#custom-sidebar)

### Basic API Access

[examples/basic/](examples/basic) is a basic API integration for a single account.

Create a config file with your <a href="https://secure.acuityscheduling.com/app.php?key=api&action=settings" target="_blank">API credentials</a> to get started.
Start the example server by doing `PORT=8000 node examples/basic/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

##### Sample `examples/config.json`
```json
{
	"userId": 1,
	"apiKey": "abc123"
}
```

### OAuth2 API Access

[examples/oauth2/](examples/oauth2) is an OAuth2 API integration.  Use this to connect multiple accounts.

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

Create a config file with your <a href="https://secure.acuityscheduling.com/app.php?key=api&action=settings" target="_blank">API key</a> credentials to get started.
Start the example server by doing `PORT=8000 node examples/webhooks/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

##### Sample `examples/config.json`
```json
{
	"apiKey": "abc123"
}
```

### Custom Sidebar

[examples/custom-sidebar/](examples/custom-sidebar) allows you to display custom information in the appointment details sidebar.

Create a config file with your <a href="https://secure.acuityscheduling.com/app.php?key=api&action=settings" target="_blank">API key</a> credentials to get started.
Start the example server by doing `PORT=8000 node examples/custom-sidebar/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

##### Sample `examples/config.json`
```json
{
	"apiKey": "abc123"
}
```
