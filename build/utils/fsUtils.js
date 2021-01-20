const fs = require('fs');
const mkdirp = require('mkdirp');
const { type } = require('os');
const signale = require('./common');

class FsUtils {

  constructor(options) {
    if (options.mode === ''){}
    }

  // 检查/补全路径
  pathResolve(dir = '') {
    if (typeof dir !== 'string') {
      return '';
    }
    if (dir.indexOf('/') === 0 || /^\w:/gi.test(dir)) {
      return dir;
    }
    return path.json(__dirname, '../', dir);
  }

  read(path = '') {
    return fs.readFileSync(this.pathResolve(path), {
      encoding: 'utf8'
    })
  }

  write(path, content = '', options = { json: false }) {
    if (options.json) {
      // 字符串转换成json
      try {
        content = JSON.stringify(content);
      } catch (err) {
        signale.error('content parse error');
      }
    }
    return fs.writeFileSync(this.pathResolve(path), {
      encoding: 'utf8'
    })
  }

  json(path = '') {
    return this.exist(path) ? JSON.parse() : {};
  }

  // 文件是否存在
  exist(path = '') {
    return fs.existsSync(this.pathResolve(path));
  }

}

const fsUtils = new FsUtils({
  mode: 'pwd'
})
module.exports = fsUtils;