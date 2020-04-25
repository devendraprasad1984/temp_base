const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('./package.json');

function getBabelConfig() {
  return {
    presets: [
      '@babel/react',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
          },
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-function-bind',
    ],
  };
}

const bundleExtractPlugin = new MiniCssExtractPlugin({
  filename: 'css/bundle.css',
  sourceMap: true,
});

const infernoBabelConfig = getBabelConfig();
infernoBabelConfig.plugins.push('inferno');

const preactBabelConfig = getBabelConfig();
preactBabelConfig.presets.splice(0, 1);
preactBabelConfig.plugins.push(['transform-react-jsx', { pragma: 'h' }]);

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: `${process.cwd()}/build`,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8050,
    publicPath: '/',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, './')],
    alias: {
      'single-spa': path.resolve(__dirname, 'node_modules/single-spa/lib/single-spa.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        options: {
          name: 'svgs/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        // options: {
        //   name: 'fonts/[name].[ext]',
        // },
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          { loader: 'resolve-url-loader', options: { removeCR: true } },
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /inferno.+\.js$/,
        loader: 'babel-loader',
        query: infernoBabelConfig,
      },
      {
        test: /preact.+\.js$/,
        loader: 'babel-loader',
        query: preactBabelConfig,
      },
      {
        test: /\.html$/,
        exclude: /node_modules|svelte/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules|inferno|preact/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /svelte.+\.html$/,
        loader: 'svelte-loader',
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      path.join(__dirname, './src'),
    ),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: './index.html',
      template: './template.html',
      meta: {
        version,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        PCFENV: '"localDev"',
      },
    }),
    bundleExtractPlugin,
  ],
};



{
  "scripts": {
    "start": "set PORT=8050 && webpack-dev-server",
    "build": "webpack --config webpack.dev-sandbox.config.js",
    "uat-build": "webpack --config webpack.uat.config.js",
    "server": "node server.js",
    "show-version": "node -e \"console.log(require('./package.json').version)\"",
    "lint": "eslint src/**"
  },
  "dependencies": {
    "@babel/cli": "^7.7.7",
    "@babel/polyfill": "^7.7.0",
    "bindings": "^1.5.0",
    "clean-webpack-plugin": "^2.0.0",
    "copy-webpack-plugin": "^4.6.0",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.5.0",
    "mirror-config-china": "^2.5.1",
    "uglifyjs-webpack-plugin": "^2.1.2",
    "webpack": "^4.41.4"
  },
  "devDependencies": {
    "@babel/core": "^7.7.7",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-function-bind": "^7.7.4",
    "@babel/plugin-proposal-object-rest-spread": "^7.7.7",
    "@babel/plugin-syntax-dynamic-import": "^7.7.4",
    "@babel/preset-env": "^7.7.7",
    "@babel/preset-react": "^7.7.4",
    "@svgr/webpack": "^5.0.1",
    "babel-eslint": "^10.0.3",
    "babel-loader": "^8.0.6",
    "css-loader": "^2.1.0",
    "eslint": "^6.7.2",
    "eslint-config-airbnb": "^18.0.1",
    "eslint-config-prettier": "^6.7.0",
    "eslint-plugin-import": "^2.19.1",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-prettier": "^3.1.2",
    "eslint-plugin-react": "^7.17.0",
    "eslint-plugin-react-hooks": "^1.7.0",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "node-sass": "^4.13.0",
    "prettier": "^1.19.1",
    "resolve-url-loader": "^3.0.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "ts-loader": "^5.3.3",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  },
  "resolutions": {},
  "-vs-binding": {
    "ProjectOpened": [
      "start"
    ]
  },
  "engines": {
    "node": "10.15.3"
  }
}


