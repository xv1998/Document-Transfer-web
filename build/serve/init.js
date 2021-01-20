// const { write, exist, mkdir, diff, signale } = require('../utils/fs');
// const install = require('../utils/deps');

const compareExtractDeps = () => {
  // 创建缓存目录
  // if (!exist(CACHE_PATH)) {
  //   mkdir(CACHE_PATH, {
  //     recursive: true
  //   });
  // }
  // if (diff(CACHE_EXTRACT_DEPS_PATH, EXTRACT_DEPS_PATH) && !process.env.ORANGE) {
  //   return install();
  // } else {
  //   signale.info("package.json一致，跳过安装!");
  //   return Promise.resolve();
  // }
  return Promise.resolve();
}

const init = async () => {
  await compareExtractDeps();
};

module.exports = init;