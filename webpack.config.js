const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const getConfig = require('hjs-webpack');

var config = getConfig({
  in: join(__dirname, 'src/app.js'),
  out: join(__dirname, 'dist')
});
