const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // No need to minify - this runs on the GAS platform, we aren't concerned
  // about making this bundle efficient for network transfers. As well,
  // this makes debugging on script.google.com slightly easier.
  mode: 'none',
  // Cannot load `babel-polyfill` here, as suggested in the docs, otherwise
  // GAS complains about how it is registered in the global context. The easiest
  // workaround appears to be to just `import` the library within `main.js`.
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
        // `regenerator-runtime` needs to be transpiled so that the rhino
        // runtime on GAS doesn't complain. If other deps need this treatment
        // in the future, simply add to the list: (foo|bar|baz).
        exclude: /node_modules\/(?!(regenerator-runtime)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'babel-preset-env',
                  {
                    // GAS complains about how the polyfill is registered when
                    // this is false. Again, not sure why this is the case, but
                    // setting this to `true` appears to alleviate the pain.
                    useBuiltIns: true,
                  },
                ],
                [
                  'google-apps-script',
                ],
              ],
              plugins: [
                // Add any plugins needed here.
              ],
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
