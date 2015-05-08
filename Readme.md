# Acuity JS Tool Kit

## Examples

### Authentication - OAuth2

This is configured with `examples/oauth2/oauth-config.js`:

```js
module.exports = {
  authorize: 'http://127.0.0.1/oauth2/authorize',
  token: 'http://127.0.0.1/oauth2/token',
  key: '123abc',
  secret: '789xyz',
  scope: 'basic',
  redirect: 'http://127.0.0.1:8000/oauth2'
};
```
