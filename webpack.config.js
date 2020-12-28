const path = require('path');
const HtmlWebpalckPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devtool: 'inlin-source-map',
  devServer: {
    contentBase: './public',
    open: true,
    port: 9001,
  },
  plugins: [
    new HtmlWebpalckPlugin({
      template: './src/index.html',
    }),
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
            // loader: 'url-loader',
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
