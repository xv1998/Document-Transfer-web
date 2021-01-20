const { isProd, isDev, isTest } = require('../utils/env');
const fsUtils = require('../utils/fsUtils');
const WebpackConfig = require('webpack-chain');
// const getPages = () => {
//     let pages;
//     if(isProd) {
//         const buildConfig = fsUtils.json()
//     }
// }

class WebpackCommonConfig {
  constructor({ polyfill }) {
    this.config = new WebpackConfig();
    this.polyfill = polyfill;
    this.initCommonConfig();
  }

  initCommonConfig() {
    this.addResolve();
  }

  addResolve() {
    this.config.resolve.extensions
      .add('.web.js')
      .add('.js')
      .add('.vue')
      .add('.json')
      .add('.md')
      .add('.jsx')
      .add('.wasm')
      .end()
      .alias.set('@', fsUtils.resove('src'))
  }

  addRules() {
    this.config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/).end();
    this.config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        hotReload: true,
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
  }
}

