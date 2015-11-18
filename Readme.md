# Acuity JS Tool Kit

## Examples

### OAuth2 API Access

[examples/oauth2/](examples/oauth2) is an OAuth2 API integration.  Use this to connect multiple accounts.

Create a config file with your OAuth2 credentials to get started.  If you don't have OAuth2 credentials, please fill out this <a href="https://acuityscheduling.com/oauth2/register" target="_blank">registration form</a>.
Start the example server by doing `PORT=8000 node examples/oauth2/index.js` and navigate to <a href="http://127.0.0.1:8000/" target="_blank">127.0.0.1:8000</a>

##### Sample `examples/oauth2/config.json`
```json
{
	"clientId": "N4HgVZbjHVp3HAkR",
	"clientSecret": "H33vYz88sEiKVbl7EMob1URDrqZrvceSCMmZJpAi",
	"redirectUri": "http://127.0.0.1:8000/oauth2"
}
```

### Custom Sidebar

The [examples/custom-sidebar](examples/custom-sidebar) is a sample callback for custom sidebar content.

Start the server by doing `node examples/custom-sidebar/index.js` or `PORT=8000 node examples/custom-sidebar/index.js` and navigate to http://127.0.0.1:8000/
