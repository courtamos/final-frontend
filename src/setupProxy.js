const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log(process.env.REACT_APP_API);
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.PROXY,
      changeOrigin: true,
    })
  );
};