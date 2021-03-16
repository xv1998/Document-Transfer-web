# web

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

{
"serve": "vue-cli-service serve",
"lint": "vue-cli-service lint",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.prod.js",
"dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.dev.js"
}

#### config
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.21.0",
    "core-js": "^3.6.5",
    "element-ui": "^2.14.1",
    "vue": "^2.6.11",
    "vue-axios": "^3.2.0",
    "vue-router": "^3.4.9"
  },
  "devDependencies": {
    "@types/mkdirp": "^1.0.1",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-core": "^6.26.3",
    "babel-eslint": "^10.1.0",
    "babel-loader": "^8.2.2",
    "babel-plugin-component": "^1.1.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "cross-env": "^7.0.3",
    "css-loader": "^5.0.1",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "file-loader": "^6.2.0",
    "shelljs": "^0.8.4",
    "signale": "^1.4.0",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "vue-hot-reload-api": "^2.3.4",
    "vue-loader": "^15.9.5",
    "vue-template-compiler": "^2.6.11",
    "webpack-chain": "^6.5.1",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.4.0"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}

