# Acuity JS Tool Kit

## Examples

### Authentication - OAuth2

[examples/oauth2](examples/oauth2) is configured with `examples/oauth2/oauth-config.js`:

```js
module.exports = {
  // Acuity OAuth2 authorize and token endpoints:
  authorize: 'http://127.0.0.1/oauth2/authorize',
  token: 'http://127.0.0.1/oauth2/token',
  // Client key and secret:
  key: '123abc',
  secret: '789xyz',
  // Requested scopes:
  scope: 'basic',
  // The auth callback for the example app.  This should be configured as a redirect URI for your client:
  redirect: 'http://127.0.0.1:8000/oauth2'
};
```

After configuring the example app, you can start a server by doing `node examples/oauth2/index.js` or `PORT=8000 node examples/oauth2/index.js` and navigate to http://127.0.0.1:8000/

### Custom Sidebar

The [examples/custom-sidebar](examples/custom-sidebar) is a sample callback for custom sidebar content.

Start the server by doing `node examples/custom-sidebar/index.js` or `PORT=8000 node examples/custom-sidebar/index.js` and navigate to http://127.0.0.1:8000/
