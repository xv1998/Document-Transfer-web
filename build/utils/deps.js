const signale = require('./common');
const shelljs = require('shelljs');
const fsUtils = require('./fsUtils');

// 构建
const install = () => {
    signale.info("检测到package.json不一样，重新安装依赖");
    shelljs.exec("yarn");
    signale.success("安装依赖结束");
    if (!fsUtils.exist(CACHE_PATH)) {
        fsUtils.mkdir(CACHE_PATH)
    }
    fsUtils.writeFile(CACHE_EXTRACT_DEPS_PATH, fsUtils.readFile(EXTRACT_DEPS_PATH));
    return Promise.resolve();
};

module.exports = install;