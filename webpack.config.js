const path = require('path');
const HtmlWebpalckPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inlin-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 9001,
  },
  plugins: [
    new HtmlWebpalckPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
        { from: path.resolve(__dirname, './src/source'), to: path.resolve(__dirname, './dist/source') },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            options: {
              limit: 10000, //以字节为单位，小于该大小的图片编译成base64
              name: 'images/[name]-[hash].[ext]', //所有图片打包到images目录
            },
            loader: 'file-loader'
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
