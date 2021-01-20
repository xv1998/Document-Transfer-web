const fs = require('fs');
const path = require('path');
const signale = require('./common');

const pathResolve = dir => {
  if(typeof dir !== 'string'){
    return '';
  }
  if(dir.indexOf('/') === 0 || /^\w:/gi.test(dir)){
    return dir;
  }
  return path.join(process.cwd(), dir);
}

const read = path => {
  return fs.readFileSync(this.pathResolve(path), {
    encoding: 'utf8'
  })
}

const write = (path, content, options = { json: false }) => {
  if (options.json) {
    try {
      content = JSON.stringify(content, null, "  ");
    } catch (err) {
      signale.error("parse error");
    }
  }
  return fs.writeFileSync(pathResolve(path), content, {
    encoding: 'utf8'
  })
}

const exist = path => {
  return fs.existsSync(pathResolve(path));
}

const json = path => {
  return exist(path) ? JSON.parse(read(path)) : {}
}

const kExist = path => {
  return fs.existsSync(path);
}

const diff = (target, source) => {
  return read(target) !== read(source);
}

const mkdir = (path, options = {}) => {
  if(!exist(path)){
    fs.mkdirSync(pathResolve(path), options);
  }
}

const move = (target, source) => {
  fs.renameSync(pathResolve(source), pathResolve(target));
}

const copy = (target, source) => {
  write(target, read(source));
}

const ext = path => {
  return path.substring(path.lastIndexOf(".")) || "js";
}

const append = (path, content) => {
  return fs.appendFileSync(pathResolve(path), content);
}

const createReadStream = path => {
  return fs.createReadStream(pathResolve(path))
}

const stat = path => {
  return fs.statSync(pathResolve(path));
}

module.exports = {
  pathResolve,
  read,
  write,
  kExist,
  exist,
  json,
  diff,
  mkdir,
  move,
  copy,
  ext,
  stat,
  append,
  createReadStream
}
