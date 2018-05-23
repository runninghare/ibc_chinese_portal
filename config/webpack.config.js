var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

// Use IBC_ENV instead of the default IONIC_ENV
// var env = process.env.IONIC_ENV;
var env = process.env.IBC_ENV;

/* Note hereby useDefaultConfig.prod and useDefaultConfig.dev are preserved, which
 * are always controlled by IONIC_ENV regardless of the environment name you use.
 *
 * Unfortunately even setting IONIC_ENV by yourself is of no use because "ionic" command
 * will always overwrite its original value.
 *
 * i.e. Unless you use --prod, it's always running in Development mode even if you
 * preset env value:
 *
 *   IONIC_ENV=prod ionic cordova build ios # ---> It's still in DEV because you didn't
 *                                          # specify --prod
 * 
 * Therefore, if we want to control dev or prod by ourselves, we'll have to use other env values, and
 * store them in useDefaultConfig.<otherValue>,
 * 
 * However if we want to use other values, apart from "dev" and "prod", then we have to
 * change the environment variable name to IBC_ENV.
 *
 * IBC_ENV=ibc_prod command # production mode
 * IBC_ENV=ibc_dev command  # development mode
 *
 * This way we wouldn't have to worry "ionic" overwrites our preset env values.
 *
 */
useDefaultConfig.prod.resolve.alias = {
  "@app/env": path.resolve(environmentPath('prod'))
};

useDefaultConfig.dev.resolve.alias = {
  "@app/env": path.resolve(environmentPath('dev'))
};

if (env !== 'prod' && env !== 'dev') {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {

  /* Hereby we map ibc_prod to prod, and ibc_dev to dev,
   * in order to reuse environment.ts for production,
   * and environmetn.dev.ts for development.
   */
  if (/^ibc_/.test(env)) {
    env = env.replace(/^ibc_/,'');
  }
  var filePath = './src/app/environment/environment' + (env === 'prod' ? '' : '.' + (env || 'dev')) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};

//////////// Before Beta Release 2018/5 /////////////////////
/*
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ionicConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = {
    dev: webpackMerge(commonConfig,ionicConfig.dev),
    prod: webpackMerge(commonConfig,ionicConfig.prod)
}
*/
/////////////// Old Contents ////////////////////////////////

/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */

// var path = require('path');
// var webpack = require('webpack');
// var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

// var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
// var PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

// var optimizedProdLoaders = [
//   {
//     test: /\.json$/,
//     loader: 'json-loader'
//   },
//   {
//     test: /\.js$/,
//     loader: [
//       {
//         loader: process.env.IONIC_CACHE_LOADER
//       },

//       {
//         loader: '@angular-devkit/build-optimizer/webpack-loader',
//         options: {
//           sourceMap: true
//         }
//       },
//     ]
//   },
//   {
//     test: /\.ts$/,
//     loader: [
//       {
//         loader: process.env.IONIC_CACHE_LOADER
//       },

//       {
//         loader: '@angular-devkit/build-optimizer/webpack-loader',
//         options: {
//           sourceMap: true
//         }
//       },

//       {
//         loader: process.env.IONIC_WEBPACK_LOADER
//       }
//     ]
//   }
// ];

// function getProdLoaders() {
//   if (process.env.IONIC_OPTIMIZE_JS === 'true') {
//     return optimizedProdLoaders;
//   }
//   return devConfig.module.loaders;
// }

// var devConfig = {
//   entry: process.env.IONIC_APP_ENTRY_POINT,
//   output: {
//     path: '{{BUILD}}',
//     publicPath: 'build/',
//     filename: '[name].js',
//     devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
//   },
//   devtool: process.env.IONIC_SOURCE_MAP_TYPE,

//   resolve: {
//     extensions: ['.ts', '.js', '.json'],
//     modules: [path.resolve('node_modules')]
//   },

//   module: {
//     loaders: [
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       },
//       {
//         test: /\.ts$/,
//         loader: process.env.IONIC_WEBPACK_LOADER
//       }
//     ]
//   },

//   plugins: [
//     ionicWebpackFactory.getIonicEnvironmentPlugin(),
//     ionicWebpackFactory.getCommonChunksPlugin(),
//     new webpack.EnvironmentPlugin(['NODE_ENV', 'IONIC_ENV'])
//   ],

//   // Some libraries import Node modules but don't use them in the browser.
//   // Tell Webpack to provide empty mocks for them so importing them works.
//   node: {
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty'
//   }
// };

// var prodConfig = {
//   entry: process.env.IONIC_APP_ENTRY_POINT,
//   output: {
//     path: '{{BUILD}}',
//     publicPath: 'build/',
//     filename: '[name].js',
//     devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
//   },
//   devtool: process.env.IONIC_SOURCE_MAP_TYPE,

//   resolve: {
//     extensions: ['.ts', '.js', '.json'],
//     modules: [path.resolve('node_modules')]
//   },

//   module: {
//     loaders: getProdLoaders()
//   },

//   plugins: [
//     ionicWebpackFactory.getIonicEnvironmentPlugin(),
//     ionicWebpackFactory.getCommonChunksPlugin(),
//     new ModuleConcatPlugin(),
//     new PurifyPlugin(),
//     new webpack.EnvironmentPlugin(['NODE_ENV', 'IONIC_ENV'])
//   ],

//   // Some libraries import Node modules but don't use them in the browser.
//   // Tell Webpack to provide empty mocks for them so importing them works.
//   node: {
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty'
//   }
// };


// module.exports = {
//   dev: devConfig,
//   prod: prodConfig
// }

