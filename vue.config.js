const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  assetsDir: './static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/custom.scss";',
      },
    },
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/config.js', to: 'static/js/config.js' }],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
