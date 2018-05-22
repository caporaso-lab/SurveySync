const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'addon.bundle.js',
  },
  plugins: [
    new GasPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/config-form.html',
        to: 'config-form.html'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'babel-preset-env',
                'google-apps-script',
              ]//,
              //plugins: [
                //'transform-object-assign',
              //],
            }
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
};
