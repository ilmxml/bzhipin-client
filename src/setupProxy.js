const {createProxyMiddleware} = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(createProxyMiddleware('/api', 
    {
        target: "http://localhost:4000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
    }))
    
    //app.use(createProxyMiddleware(...)) //可以配置多个代理
}