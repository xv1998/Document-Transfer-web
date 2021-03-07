module.exports = {
  devServer: {
    proxy: {
      '/file': {
        target: 'http://localhost:8081/',  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/file': '/file'   //需要rewrite的,
        }
      },
    }
  }
}