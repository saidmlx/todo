const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0'
  },
  entry: {
    home: path.resolve(__dirname, 'src/js/', 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Create css file in production mode or inject into html devmode
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.jpg|png|gif|woff|ttf|.svg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            options: {
              publicPath: '../'
            }
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TODO',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}
