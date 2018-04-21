var webpack = require('webpack');

module.exports = {
    plugins: [
      new webpack.EnvironmentPlugin({
          'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
          'NODE_ENV': 'development'
      })
    ]
};