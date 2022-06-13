const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: { configFile: path.resolve(__dirname, 'tsconfig.json') },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'web',
  plugins: [new Dotenv()],
}
