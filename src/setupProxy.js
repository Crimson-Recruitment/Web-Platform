const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://di344jdqvl.execute-api.us-east-1.amazonaws.com/prod/",
      changeOrigin: true,
    }),
  );
};
