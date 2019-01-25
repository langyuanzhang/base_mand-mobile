# base_mand-mobile
使用滴滴mand-mobile前端框架，vue基础环境配置实例————基础版



使用是注意修改 ```config/index.js``` 文件的 开发环境域名 ``` http://web.test.com ```

```js
proxyTable: {
      '/': {
        target: 'http://web.test.com/',//设置你调用的接口域名和端口号  
        changeOrigin: true,     //跨域  
        pathRewrite: {
          '^/': '/'       
        }
      }},
```

还要修改 ```config/prod.env.js```文件的 正式环境下的域名 ``` "http://www.baidu.com/" ```

```js
module.exports = {
  NODE_ENV: '"production"',
  API_HOST:'"http://www.baidu.com/"'
}
```