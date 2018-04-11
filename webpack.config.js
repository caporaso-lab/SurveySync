const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'addon.bundle.js',
  },
  plugins: [
    new GasPlugin(),
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
              ]
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
