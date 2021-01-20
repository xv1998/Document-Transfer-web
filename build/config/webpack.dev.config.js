class WebpackDevelopmentConfig {
  constructor() {

  }

  initDevelopmentConfig() {
    this.addEnv();
  }

  addEnv() {
    this.config.devtool("eval-source-map");
    this.config.mode("development");
  }

  addEntry() {
    
  }
}

module.exports = WebpackDevelopmentConfig;