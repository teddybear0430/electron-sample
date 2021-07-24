import path from 'path';

/** エディタで補完を効かせるために型定義をインポート */
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

// 共通の設定
const base: Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : false,
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // webpack@5.x + electron では必須の設定
    publicPath: './',
    filename: '[name].js',
    // 画像などのアセットは 'images' フォルダへ配置する
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          /* セキュリティ対策のため（後述）style-loader は使用しない **/
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        /** アセット類も同様に asset/inline は使用しない */
        type: 'asset/resource',
      },
    ],
  },
};

const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: './electron/main.ts',
  },
};

// プリロード・スクリプト用の設定
const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    main: './electron/preload',
  },
};

// レンダラープロセス用の設定
const render: Configuration = {
  ...base,
  // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
  target: 'web',
  entry: {
    renderer: './src/renderer.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

/**
 * メイン，プリロード，レンダラーそれぞれの設定を
 * 配列に入れてエクスポート
 */
export default [main, preload, render];
