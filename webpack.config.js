const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  devServer: {
    static: './dist',
  },
 module: {
    rules:[
        {
            test:/\.(s*)css$/,
            use:['style-loader','css-loader', 'sass-loader']
         }
    ],
 },
};