// var path = require('path');
// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/public');

// module.exports = {
//   entry: `${SRC_DIR}/app.js`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: [
//           'babel-loader',
//         ]
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
//       }
//     ]
//   }
// };

const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      }

    ],
  }
};

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];
