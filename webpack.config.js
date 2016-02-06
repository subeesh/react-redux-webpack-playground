var webpack = require('webpack')

var definePlugin = new webpack.DefinePlugin({
  API: JSON.stringify('http://localhost:8080/https://developers.zomato.com/api/v2.1'),
  API_KEY: JSON.stringify(process.env.ZOMATO_API_KEY)
})

module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: '/index.js'
  },
  plugins: [definePlugin],
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}
