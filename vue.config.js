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
  },
  /*
* 两个模式，GenerateSW（默认）和 InjectManifest
* GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
* InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
* 拿到预缓存列表
*/
  pwa: {
    name: 'file-transfer-web',
    themeColor: '#6476DB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      importWorkboxFrom: 'disabled',
      importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js'
      // ...other Workbox options...
    }
  }
}