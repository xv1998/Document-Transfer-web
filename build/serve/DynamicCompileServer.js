const signale = require('../utils/common');
const webpack = require('webpack');
const path = require('path');
const chokidar = require('chokidar');
const dayjs = require('dayjs');
const webpackDevServer = require('webpack-dev-server');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

class DynamicCompileServer {
  constructor(options) {
    this.devServer = options.devServer;
    this.analyze = options.analyze;
    this.initial();
  }

  configureWebapck() {
    this.hotEntry = path.resolve()
  }

  start() {
    signale.info('开始编译');
    this.compiler = webpack();
    const serve = new webpackDevServer();
  }

  // 构建列表
  changedFile = ''

  initial() {
    const watcher = chokidar.watch('src/**.(vue|js)', {
      persistent: true,
      ignored: /(^|[/\\])\../
    })
    watcher.on('change', path => {
      this.changedFile = path;
    })

    // 构建时间开始
    this.prev = dayjs().valueOf();
    this.webpackConfig = this.analyze ? smp.wrap(
      new WebpackDevelopmentConfig().toConfig({ saveConfig: this.saveConfig })
    ) : 
  }
}

module.exports = DynamicCompileServer;