const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:'/webapp/markless',
  assetsDir: './static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/custom.scss";',
      },
    },
  },
  configureWebpack:{
    plugins:[
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/config.js', to: 'static/js/config.js' },
        ],
      }),
    ]
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
})
