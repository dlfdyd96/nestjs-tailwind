const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function(webpackEnv, argv) {

  const isEnvProduction = webpackEnv?.NODE_ENV === 'production';

  const targetPlugins = [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/public/css', to: path.join(__dirname, 'dist/public/css') },
        { from: './src/views', to: path.join(__dirname, 'dist/views') },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: [`echo "Webpack Build Start.." && npm run build:tailwind:${isEnvProduction ? 'prod' : 'dev'}`],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ['echo "Webpack Build End.."']
      },
    }),
  ];

  if (!isEnvProduction) {
    targetPlugins.push(new RunScriptWebpackPlugin({ name: 'server.js' }));
  }

  return {
    mode: 'development',
    target: 'node',
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: targetPlugins,
  };

};


