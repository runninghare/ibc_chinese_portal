var webpack = require('webpack');

console.log("========= check webpack env plugin =========");

console.log(process.env);

module.exports = {
    plugins: [
      new webpack.EnvironmentPlugin({
          'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
          'NODE_ENV': 'development'
      })
    ]
};