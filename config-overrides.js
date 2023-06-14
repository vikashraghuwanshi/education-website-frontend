const webpack = require('webpack')
require('dotenv').config();


module.exports = function override(config, env) {
  // Add environment variables to webpack DefinePlugin
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.BACKEND_HOST': JSON.stringify(process.env.BACKEND_HOST),
      // Add more environment variables as needed
    })
  );

  return config;
};
