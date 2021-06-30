const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // 3000번 포트에서 보낼때 target은 5000번(server/index.js > port)
      changeOrigin: true,
    })
  );
};