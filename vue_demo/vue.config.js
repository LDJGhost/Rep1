const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/5000': {
        target: 'http://localhost:5000',
        pathRewrite:{'/5000':''},
        ws: true,
        changeOrigin: false
      }
    }
  }
})
