const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    js: './checkout/js/checkout6-custom.js', // Entrada para JS
    styles: './checkout/css/checkout6-custom.css', // Entrada para CSS
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'js'
        ? 'checkout6-custom.js' // Saída para JS
        : '[name]-trash.js'; // Arquivo temporário para outras entradas (não será usado)
    },
    path: path.resolve(__dirname, 'dist/checkout'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'checkout/css'),
        use: [
          MiniCssExtractPlugin.loader, // Extrai CSS em um arquivo separado
          {
            loader: 'css-loader',
            options: {
              url: false, // Desabilita a resolução de URLs no CSS
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'checkout6-custom.css', // Apenas um arquivo CSS como saída
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // Minifica JS
      new CssMinimizerPlugin(), // Minifica CSS
    ],
  },
};
