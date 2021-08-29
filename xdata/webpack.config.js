const path = require('path')

module.exports = {
  devtool:'source-map',
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization:{
    //minimize:false
  }
};