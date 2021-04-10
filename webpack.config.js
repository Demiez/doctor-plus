const path = require('path'),
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  Dotenv = require('dotenv-webpack');

const clientConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: ['./client/app/App.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  devServer: {
    contentBase: '/dist',
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.client.json',
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './client/assets/fonts',
            },
          },
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'app', 'index.html'),
      favicon: './client/assets/images/doctor_plus_icon.png',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  stats: 'errors-only',
};

const serverConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: './server/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
  target: 'node',
  node: {
    __dirname: false,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
    new Dotenv(),
  ],
  stats: 'errors-only',
  externals: [nodeExternals()],
};

module.exports = [clientConfig, serverConfig];
