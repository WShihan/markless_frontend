const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:'/webapp/markless',
  assetsDir: './static',
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/css/custom.scss";',
      },
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
})
